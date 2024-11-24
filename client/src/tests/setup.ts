import { afterEach } from  'vitest' 
import { cleanup } from  '@testing-library/react' 
import  '@testing-library/jest-dom/vitest' 

beforeAll(() => {
  window.matchMedia = window.matchMedia || function (query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function () {},
      removeListener: function () {}, 
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {},
    };
  };
});

afterEach ( () => { 
  cleanup (); 
})