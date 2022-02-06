import { Observable, of } from "rxjs";
import { na_a, na_b, na_c, na_d, na_e, na_f, na_g, na_h, na_i, na_j, na_k, na_l,  na_m, na_n, na_o, na_p, na_q, na_r, na_s, na_t, na_u, na_w, na_x, na_y, na_z } from ".";

function split_by_5(input: string): string[] {
  return input.split(/(.{5})/).filter(x => x.length == 5);
}

export function dictionary(): Observable<string[]> {
  const words = 
    split_by_5(na_a)
    .concat(split_by_5(na_b))
    .concat(split_by_5(na_c))
    .concat(split_by_5(na_d))
    .concat(split_by_5(na_e))
    .concat(split_by_5(na_f))
    .concat(split_by_5(na_g))
    .concat(split_by_5(na_h))
    .concat(split_by_5(na_i))
    .concat(split_by_5(na_j))
    .concat(split_by_5(na_k))
    .concat(split_by_5(na_l))
    .concat(split_by_5(na_m))
    .concat(split_by_5(na_n))
    .concat(split_by_5(na_o))
    .concat(split_by_5(na_p))
    .concat(split_by_5(na_q))
    .concat(split_by_5(na_r))
    .concat(split_by_5(na_s))
    .concat(split_by_5(na_t))
    .concat(split_by_5(na_u))
    .concat(split_by_5(na_w))
    .concat(split_by_5(na_x))
    .concat(split_by_5(na_y))
    .concat(split_by_5(na_z))

  return of(words);
}