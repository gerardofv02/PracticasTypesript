import { assertEquals } from "https://deno.land/std@0.159.0/testing/asserts.ts";
import  todoJunto  from "./main.ts";

Deno.test("TodoJunto",() =>{
    assertEquals(todoJunto([1,2,"3",[4,5,"6",[7,8,"9"]]])    ,      [362880,181440,120960,90720,72576,60480,51840,45360,40320]);
});

Deno.test("TodoJunto2",() =>{
    assertEquals(todoJunto([9,0,"7",[6,5,"4",[3,0,"1"]]])    ,      [0,0,0,0,0,0,0,0,0]);
});
