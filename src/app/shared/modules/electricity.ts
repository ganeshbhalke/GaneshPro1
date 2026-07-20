export interface IElectricity {
  id?: string;

  title: string;
  image: string;
  description: string;
  voltage: string;
  power: string;
  category: string;

  manufacturer?: string;
  modelNumber?: string;
  warranty?: string;
  country?: string;
  efficiency?: string;
  installationType?: string;
  weight?: string;
}