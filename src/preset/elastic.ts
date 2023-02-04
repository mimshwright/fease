import { createEaseSet } from "../util";
import { elastic as elasticFactory } from "./../factory/elastic";

export const [elasticIn, elasticOut, elasticInOut, elasticOutIn] =
  createEaseSet(elasticFactory(6)(0.8)(3), true);
