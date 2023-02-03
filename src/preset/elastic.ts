import { easeInOut, easeMiddle, easeOut } from "../decorator/ease";
import { elastic as elasticFactory } from "./../factory/elastic";

export const elasticOut = elasticFactory(7)(1)(2.5);
export const elasticIn = easeOut(elasticOut);
export const elasticInOut = easeInOut(elasticIn);
export const elasticOutIn = easeMiddle(elasticIn);
