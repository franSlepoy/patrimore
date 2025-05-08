// jest.setup.js
require("@testing-library/jest-dom");

// Stub del paquete ESM de loaders (ldrs/react) que Jest no puede parsear
jest.mock("ldrs/react", () => ({
    Quantum: () => null,
  }));
  
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
