const deviceSizes = {
    iphoneFive: "320px",
    mobile: "500px",
    tablet: "800px",
    pc: "1024px",
};
  
const device = {
    iphoneFive: `screen and (max-width: ${deviceSizes.iphoneFive})`, 
    mobile: `screen and (max-width: ${deviceSizes.mobile})`,
    tablet: `screen and (max-width: ${deviceSizes.tablet})`,
    pc: `screen and (max-width: ${deviceSizes.pc})`,
};

export default device;