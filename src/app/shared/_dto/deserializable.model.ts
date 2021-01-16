// src/app/shared/_models/deserializable.model.ts

export interface Deserializable {
  deserialize(input: any): this;
}
