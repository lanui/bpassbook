export const NOOP = () => {};

export const iconSrcBase64 =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAADeklEQVQ4jT2UT2hcVRTGf+fe92ZeMmlmkrQmqdbSZGNFsMVFsfgHkirdFNqi+IcqQqWgCNUiWkELDd3oQoroRtyouHAVAtZWTJONSEqhYqFILVECKm3CpEknM5k/794j900mD967cM893/vOd7575JG3qlgcScSoUf+eOHfAqA7EQmpQLMrmqoqgkYVyBNNWzCeKzgPIoydriHcHjU8nDZrkI1hcdlQq7eQIvwEEQ33Ctl4hTT1WfdirR8YesdZeiiRvd/lq66JHyFvhn2XH3pGYF5/O0xULzilJDMv3PN9eqPJv2THcb/Au8NAE7y7m49xI1Ki3JhTIibBU8QwPWL7/sEitriytepJYqDc8Dwxantqb55WPyqzWPD15E4BQdaw3mxOR94wFFZwoKzU4sCcmF8GTH6xw4++U4ZJwZ8mxe6flypdb2b8nz9Rsje7BULBijcGhY6YpFDCCV0GssNYI/KCvZCkWLU4MlTq8/UJPIMDsb80s5hB89hpSKBjFuLDpRHCZrJIBzd9W7lbh/gHDG0e7eWk84bkzKywsenp6AgsyoDagcZFDVMKvBNLwMcLymnJoX45Th/MZkLSxKRUNXoRaU4glMN8IoGo8dFDxAvfqGRafvt7FHwuOC1da2dEf5hp89W4vJw53c+s/h1iT5XWYGbdBzymYSFisKKWCMHU15dl31tj/sOX8VJ1Dx1f4+VqLidd6GNkRs1TRzdJcG2iDkQiNlrB9wGQMjn+2ztcTW+gtGE5/U6e0O8fZ72pZbPyxHLdXFZWO4BB5JJMgKzEVCkm77l/OFXhop2HsTI0gUrEorK63FSnkhZaGBpEpHA6YFGM7OoWE1LeB7tTgmXPrzP7uGNpqWfjTc/SJfBb79aaj0G2y5mi7ScFOVJvaphiUC/qE58QXDaZnHDu2G3wT3jyWcPblhJ+utZi+njLYbzPvNbMbK9XIW5lxKceC2FHBMHdLUQ83P+/KDJg1eaPLk3Mpr56vsa3PZExcMLEXfGxmZPC07lqrur/CiAhX4+6y4/FRw/P7JLu0waJrTeXydcePV1vctwWGioJLfTZWIpSkkIxI6ZSSej2o3k8ar0kAK5c9VH1QsuM3oi7lwX7Ih075TZB6bOSINXJJuk8qIhqcOupV38cxbvEDVkjDPOoMtpAYjGHQKFItW8Pl2MjHUermwfM/dYqWYnjQ/J0AAAAASUVORK5CYII=';

export function iconElement(opts, document) {
  document = document || window.document;
  const { size, zIndex } = opts;
  const _size = size || 16;

  const img = document.createElement('img');
  img.setAttribute('width', _size);
  img.setAttribute('height', _size);
  img.src = iconSrcBase64;

  return img;
}
