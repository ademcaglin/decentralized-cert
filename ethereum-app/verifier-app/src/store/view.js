export const viewInitialState = {
  certificate: { isValid: false }
};

export const viewActions = {
  displayCertificate: state => {
    return { certificate: state.isValid };
  }
};
