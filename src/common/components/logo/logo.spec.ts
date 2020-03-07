import { shallowMount } from "@vue/test-utils";
import Logo from "./logo.vue";

describe("logo.vue", () => {
  it("has proper default size", () => {
    const wrapper = shallowMount(Logo);
    const attributes = wrapper.find("img").attributes();
    const expectedDimension = "75";

    expect(attributes.width).toBe(expectedDimension);
    expect(attributes.height).toBe(expectedDimension);
  });

  it("has proper source", () => {
    const wrapper = shallowMount(Logo);
    const expectedIconName = "basket";

    expect(
      wrapper
        .find("img")
        .attributes()
        .src.includes(expectedIconName)
    ).toBe(true);
  });

  it("contains alternative text", () => {
    const wrapper = shallowMount(Logo);

    expect(wrapper.find("img").attributes("alt")).toBeTruthy();
  });

  describe("when data has been passed to props.size", () => {
    it("width and height attributes get their values from props.size", () => {
      const wrapper = shallowMount(Logo, { propsData: { size: "10" } });
      const attributes = wrapper.find("img").attributes();
      const expectedDimension = wrapper.props().size;

      expect(attributes.width).toBe(expectedDimension);
      expect(attributes.height).toBe(expectedDimension);
    });
  });
});
