
// models for address
interface Geolocation {
  latitude: string;
  longitude: string;
}

interface Address {
  _id?: string;
  geolocation?: Geolocation;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  zipCode: number;
}

export default Address;
