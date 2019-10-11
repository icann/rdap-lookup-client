export enum EntityType {
  Registrant = 'registrant',
  Technical = 'technical',
  Administrative = 'administrative',
  Billing = 'billing',
  Registrar = 'registrar',
  Reseller = 'reseller'
}

export class Entity {
  email: string;
  ianaId: string;
  link: string;
  abuseEmail: string;
  abusePhone: string;
  legalRepresentative: string;
  fn: string;
  street: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
  mailingAddress: string;
  role: string;
  entityType: EntityType;
  isDisplayed = false;
  notDisplayedRoles: Array<String> = ['registrar', 'registrant', 'technical', 'administrative', 'reseller'];
  remarks: Array<Object> = [];

  constructor (entity: any, role = null) {
    const vcard = (entity.vcardArray) ? entity.vcardArray[1] : [];
    const name = vcard.find((el) => el.includes('fn'));
    const org = vcard.find((el) => el.includes('org') && Array.isArray(el) && el[0] !== 'kind');
    const address = vcard.find((el) => el.includes('adr'));
    const numbers = vcard.filter((el) => el.includes('tel'));
    const email = vcard.find((el) => el.includes('email'));
    const url = vcard.find((el) => el.includes('url'));

    let abuseEmail;
    let abusePhone;

    if (role === null && entity.roles) {
      this.role = entity.roles[0];
    } else {
      this.role = role;
    }

    if (entity.entities) {
      const registrarAbuse = entity.entities.find((el) => el.roles && el.roles.includes('abuse'));
      if (registrarAbuse) {
        if (registrarAbuse.vcardArray) {
          const abuseVcard = registrarAbuse.vcardArray[1];
          if (abuseVcard) {
            abuseEmail = abuseVcard.find((el) => el.includes('email'));
            abusePhone = abuseVcard.find((el) => el.includes('tel'));
          }
        }
      }
    }

    this.mailingAddress = '';
    if (address && address[3]) {
      for (const index in address[3]) {
        if (address[3][index] && address[3][index] !== '' && Array.isArray(address[3][index]) === false) {
          this.mailingAddress += ` ${address[3][index].toString().replace('CC=', '')},`;
        } else if (Array.isArray(address[3][index]) === true) {
          address[3][index].forEach(element => {
            if (element !== '') {
              this.mailingAddress += ` ${element.toString().replace('CC=', '')},`;
            }
          });
        }
      }
    }

    this.mailingAddress = this.mailingAddress.slice(0, -1).trim();
    this.email = vcard.email ? vcard.email[3] : null;
    this.fn = (org && org[0] !== 'kind') ? org[3] : null;
    this.ianaId = entity.publicIds ? entity.publicIds[0].identifier : null;
    this.link = url ? url[3] : null;
    this.abuseEmail = abuseEmail ? abuseEmail[3] : null;
    this.abusePhone = abusePhone ? abusePhone[3] : null;
    this.legalRepresentative = name ? name[3] : null;
    this.entityType = this.getRoleTypeFromString(this.role);

    if (email) {
      this.email = email[3];
    }

    numbers.forEach(number => {
      if (number[1].type === 'voice') {
        this.phone = number[3];
      } else if (number[1].type === 'fax') {
        this.fax = number[3];
      }
    });

    if (entity.remarks) {
      for (const index in entity.remarks) {
        if (!this.remarks.find((el: any) => el.type === entity.remarks[index].type)) {
          this.remarks.push(entity.remarks[index]);
        }
      }
    }

    if (!this.notDisplayedRoles.includes(this.role)) {
      this.isDisplayed = true;
    } else {
      this.isDisplayed = false;
    }
  }

  private getRoleTypeFromString (role: string): EntityType {
    const key = Object.keys(EntityType).find(x => EntityType[x] === role);

    return EntityType[key];
  }

  public isContactEmpty () {
    if (
      this.remarks.length === 0 && !this.email && !this.ianaId && !this.link && !this.abuseEmail
      && !this.abusePhone && !this.legalRepresentative
      && !this.fn && !this.street && !this.city && !this.stateProvince && !this.postalCode && !this.country
      && !this.phone && !this.fax && (!this.mailingAddress || !this.mailingAddress.replace(/\s/g, '').length)) {
      return true;
    } else {
      return false;
    }
  }

  parseEntityFromWhois (entity: any, role: string) {
    if (!entity) {
      return;
    }

    this.email = entity.email;
    this.ianaId = entity.registrarIANAID;
    this.abuseEmail = entity.registrarAbuseContactEmail;
    this.abusePhone = (!entity.registrarAbuseContactPhone) ? null : entity.registrarAbuseContactPhone.number;
    this.phone = (!entity.phone) ? null : entity.phone.number;
    this.fax = (!entity.fax) ? null : entity.fax.number;
    this.legalRepresentative = entity.name;
    this.fn = entity.organization || entity.registrar;
    this.street = entity.street;
    this.country = entity.country;
    this.role = role;
    this.stateProvince = entity.state_province;
    this.postalCode = entity.postalCode;
    this.mailingAddress = `${this.street || ''} ${this.stateProvince || ''} ${this.postalCode || ''} ${this.country || ''}`.trim();
  }
}
