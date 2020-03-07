import { shallowMount } from "@vue/test-utils";
import Loader from "./loader.vue";

describe("loader.vue", () => {
  it("has proper default size", () => {
    const wrapper = shallowMount(Loader);
    const attributes = wrapper.find("img").attributes();
    const expectedDimension = "80";

    expect(attributes.width).toBe(expectedDimension);
    expect(attributes.height).toBe(expectedDimension);
  });

  it("has proper source", () => {
    const wrapper = shallowMount(Loader);
    const expectedIconName = "ball";

    expect(
      wrapper
        .find("img")
        .attributes()
        .src.includes(expectedIconName)
    ).toBe(true);
  });

  it("contains alternative text", () => {
    const wrapper = shallowMount(Loader);

    expect(wrapper.find("img").attributes("alt")).toBeTruthy();
  });

  describe("when data has been passed to props.size", () => {
    it("width and height attributes get their values from props.size", () => {
      const wrapper = shallowMount(Loader, { propsData: { size: "20" } });
      const attributes = wrapper.find("img").attributes();
      const expectedDimension = wrapper.props().size;

      expect(attributes.width).toBe(expectedDimension);
      expect(attributes.height).toBe(expectedDimension);
    });
  });
});
