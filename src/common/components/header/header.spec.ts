import { shallowMount } from "@vue/test-utils";
import Header from "./header.vue";
import Logo from "../logo/logo.vue";

describe("header.vue", () => {
  it("renders logo", () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.find(Logo).exists()).toBe(true);
  });
});
