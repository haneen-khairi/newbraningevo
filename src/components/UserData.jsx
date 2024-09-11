import { Button } from "antd";
import React from "react";

export default function UserData({ data }) {
  return (
    <>
      <div  className="p-4">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 border-solid border-gray-200 border-b-[0.5px] pb-3">
          <div className="flex flex-col sm:flex-row items-center mb-2 sm:mb-0">
            <span className="me-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="24" fill="#FAFAFA" />
                <g clip-path="url(#clip0_397_12003)">
                  <path
                    d="M34.1699 13.8201L33.1199 12.9101C31.9099 11.7001 29.9499 11.7001 28.7399 12.9101C28.7099 12.9401 26.8599 15.3501 26.8599 15.3501C25.7199 16.5501 25.7199 18.4401 26.8599 19.6301L28.0199 21.0901C26.5599 24.4001 24.2899 26.6801 21.0899 28.0401L19.6299 26.8701C18.4399 25.7201 16.5399 25.7201 15.3499 26.8701C15.3499 26.8701 12.9399 28.7201 12.9099 28.7501C11.6999 29.9601 11.6999 31.9201 12.8599 33.0801L13.8599 34.2301C15.0099 35.3801 16.5599 36.0101 18.2399 36.0101C25.8799 36.0101 35.9999 25.8801 35.9999 18.2501C35.9999 16.5801 35.3699 15.0201 34.1699 13.8301V13.8201ZM18.2399 34.0001C17.0999 34.0001 16.0499 33.5801 15.3299 32.8501L14.3299 31.7001C13.9199 31.2901 13.8999 30.6201 14.2899 30.1901C14.2899 30.1901 16.6799 28.3501 16.7099 28.3201C17.1199 27.9101 17.8399 27.9101 18.2599 28.3201C18.2899 28.3501 20.2999 29.9601 20.2999 29.9601C20.5799 30.1801 20.9499 30.2401 21.2799 30.1101C25.4199 28.5301 28.3899 25.5701 30.0999 21.3001C30.2299 20.9701 30.1799 20.5901 29.9499 20.3001C29.9499 20.3001 28.3399 18.2801 28.3199 18.2601C27.8899 17.8301 27.8899 17.1401 28.3199 16.7101C28.3499 16.6801 30.1899 14.2901 30.1899 14.2901C30.6199 13.9001 31.2899 13.9101 31.7499 14.3701L32.7999 15.2801C33.5699 16.0501 33.9999 17.1001 33.9999 18.2401C33.9999 25.2001 24.2299 34.0001 18.2399 34.0001Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_397_12003">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(12 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[#767676]">{data.phone}</p>
          </div>
          <div className="flex flex-col sm:flex-row  items-center">
            <span className="me-2">
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" width="48" height="48" rx="24" fill="#FAFAFA" />
                <g clip-path="url(#clip0_397_11993)">
                  <path
                    d="M31.5 13H17.5C16.1744 13.0016 14.9036 13.5289 13.9662 14.4662C13.0289 15.4036 12.5016 16.6744 12.5 18V30C12.5016 31.3256 13.0289 32.5964 13.9662 33.5338C14.9036 34.4711 16.1744 34.9984 17.5 35H31.5C32.8256 34.9984 34.0964 34.4711 35.0338 33.5338C35.9711 32.5964 36.4984 31.3256 36.5 30V18C36.4984 16.6744 35.9711 15.4036 35.0338 14.4662C34.0964 13.5289 32.8256 13.0016 31.5 13ZM17.5 15H31.5C32.0988 15.0012 32.6835 15.1815 33.179 15.5178C33.6744 15.8541 34.0579 16.3309 34.28 16.887L26.622 24.546C26.0584 25.1073 25.2954 25.4225 24.5 25.4225C23.7046 25.4225 22.9416 25.1073 22.378 24.546L14.72 16.887C14.9421 16.3309 15.3256 15.8541 15.821 15.5178C16.3165 15.1815 16.9012 15.0012 17.5 15ZM31.5 33H17.5C16.7044 33 15.9413 32.6839 15.3787 32.1213C14.8161 31.5587 14.5 30.7956 14.5 30V19.5L20.964 25.96C21.9026 26.8963 23.1743 27.422 24.5 27.422C25.8257 27.422 27.0974 26.8963 28.036 25.96L34.5 19.5V30C34.5 30.7956 34.1839 31.5587 33.6213 32.1213C33.0587 32.6839 32.2956 33 31.5 33Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_397_11993">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(12.5 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[#767676]">{data.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col sm:flex-row  items-center mb-2 sm:mb-0 mt-2">
            <span className="me-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="48" height="48" rx="24" fill="#FAFAFA" />
                <g clip-path="url(#clip0_397_12026)">
                  <path
                    d="M31 16H27V15C27 14.2044 26.6839 13.4413 26.1213 12.8787C25.5587 12.3161 24.7956 12 24 12C23.2044 12 22.4413 12.3161 21.8787 12.8787C21.3161 13.4413 21 14.2044 21 15V16H17C15.6744 16.0016 14.4036 16.5289 13.4662 17.4662C12.5289 18.4036 12.0016 19.6744 12 21V31C12.0016 32.3256 12.5289 33.5964 13.4662 34.5338C14.4036 35.4711 15.6744 35.9984 17 36H31C32.3256 35.9984 33.5964 35.4711 34.5338 34.5338C35.4711 33.5964 35.9984 32.3256 36 31V21C35.9984 19.6744 35.4711 18.4036 34.5338 17.4662C33.5964 16.5289 32.3256 16.0016 31 16ZM23 15C23 14.7348 23.1054 14.4804 23.2929 14.2929C23.4804 14.1054 23.7348 14 24 14C24.2652 14 24.5196 14.1054 24.7071 14.2929C24.8946 14.4804 25 14.7348 25 15V17C25 17.2652 24.8946 17.5196 24.7071 17.7071C24.5196 17.8946 24.2652 18 24 18C23.7348 18 23.4804 17.8946 23.2929 17.7071C23.1054 17.5196 23 17.2652 23 17V15ZM34 31C34 31.7956 33.6839 32.5587 33.1213 33.1213C32.5587 33.6839 31.7956 34 31 34H17C16.2044 34 15.4413 33.6839 14.8787 33.1213C14.3161 32.5587 14 31.7956 14 31V21C14 20.2044 14.3161 19.4413 14.8787 18.8787C15.4413 18.3161 16.2044 18 17 18H21.184C21.3876 18.5845 21.7682 19.0912 22.2727 19.4498C22.7773 19.8083 23.381 20.0009 24 20.0009C24.619 20.0009 25.2227 19.8083 25.7273 19.4498C26.2318 19.0912 26.6124 18.5845 26.816 18H31C31.7956 18 32.5587 18.3161 33.1213 18.8787C33.6839 19.4413 34 20.2044 34 21V31ZM22 22H17C16.7348 22 16.4804 22.1054 16.2929 22.2929C16.1054 22.4804 16 22.7348 16 23V31C16 31.2652 16.1054 31.5196 16.2929 31.7071C16.4804 31.8946 16.7348 32 17 32H22C22.2652 32 22.5196 31.8946 22.7071 31.7071C22.8946 31.5196 23 31.2652 23 31V23C23 22.7348 22.8946 22.4804 22.7071 22.2929C22.5196 22.1054 22.2652 22 22 22ZM21 30H18V24H21V30ZM32 27C32 27.2652 31.8946 27.5196 31.7071 27.7071C31.5196 27.8946 31.2652 28 31 28H26C25.7348 28 25.4804 27.8946 25.2929 27.7071C25.1054 27.5196 25 27.2652 25 27C25 26.7348 25.1054 26.4804 25.2929 26.2929C25.4804 26.1054 25.7348 26 26 26H31C31.2652 26 31.5196 26.1054 31.7071 26.2929C31.8946 26.4804 32 26.7348 32 27ZM32 23C32 23.2652 31.8946 23.5196 31.7071 23.7071C31.5196 23.8946 31.2652 24 31 24H26C25.7348 24 25.4804 23.8946 25.2929 23.7071C25.1054 23.5196 25 23.2652 25 23C25 22.7348 25.1054 22.4804 25.2929 22.2929C25.4804 22.1054 25.7348 22 26 22H31C31.2652 22 31.5196 22.1054 31.7071 22.2929C31.8946 22.4804 32 22.7348 32 23ZM30 31C30 31.2652 29.8946 31.5196 29.7071 31.7071C29.5196 31.8946 29.2652 32 29 32H26C25.7348 32 25.4804 31.8946 25.2929 31.7071C25.1054 31.5196 25 31.2652 25 31C25 30.7348 25.1054 30.4804 25.2929 30.2929C25.4804 30.1054 25.7348 30 26 30H29C29.2652 30 29.5196 30.1054 29.7071 30.2929C29.8946 30.4804 30 30.7348 30 31Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_397_12026">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(12 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[#767676]">{data.id}</p>
          </div>
          <div className="flex flex-col sm:flex-row  items-center mt-2">
            <span className="me-2">
              <svg
                width="49"
                height="48"
                viewBox="0 0 49 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.5" width="48" height="48" rx="24" fill="#FAFAFA" />
                <g clip-path="url(#clip0_397_12015)">
                  <path
                    d="M24.5 18C23.7089 18 22.9355 18.2346 22.2777 18.6741C21.6199 19.1136 21.1072 19.7384 20.8045 20.4693C20.5017 21.2002 20.4225 22.0044 20.5769 22.7804C20.7312 23.5563 21.1122 24.269 21.6716 24.8284C22.231 25.3878 22.9437 25.7688 23.7196 25.9231C24.4956 26.0775 25.2998 25.9983 26.0307 25.6955C26.7616 25.3928 27.3864 24.8801 27.8259 24.2223C28.2654 23.5645 28.5 22.7911 28.5 22C28.5 20.9391 28.0786 19.9217 27.3284 19.1716C26.5783 18.4214 25.5609 18 24.5 18ZM24.5 24C24.1044 24 23.7178 23.8827 23.3889 23.6629C23.06 23.4432 22.8036 23.1308 22.6522 22.7654C22.5009 22.3999 22.4613 21.9978 22.5384 21.6098C22.6156 21.2219 22.8061 20.8655 23.0858 20.5858C23.3655 20.3061 23.7219 20.1156 24.1098 20.0384C24.4978 19.9613 24.8999 20.0009 25.2654 20.1522C25.6308 20.3036 25.9432 20.56 26.1629 20.8889C26.3827 21.2178 26.5 21.6044 26.5 22C26.5 22.5304 26.2893 23.0391 25.9142 23.4142C25.5391 23.7893 25.0304 24 24.5 24Z"
                    fill="#767676"
                  />
                  <path
                    d="M24.4998 36.0001C23.6578 36.0044 22.8269 35.8069 22.0769 35.4241C21.3268 35.0413 20.6794 34.4844 20.1888 33.8C16.3778 28.543 14.4448 24.591 14.4448 22.053C14.4448 19.3863 15.5042 16.8288 17.3899 14.9431C19.2755 13.0574 21.8331 11.998 24.4998 11.998C27.1666 11.998 29.7241 13.0574 31.6098 14.9431C33.4955 16.8288 34.5548 19.3863 34.5548 22.053C34.5548 24.591 32.6218 28.543 28.8108 33.8C28.3202 34.4844 27.6728 35.0413 26.9228 35.4241C26.1727 35.8069 25.3419 36.0044 24.4998 36.0001ZM24.4998 14.181C22.4122 14.1834 20.4108 15.0138 18.9347 16.4899C17.4586 17.9661 16.6282 19.9675 16.6258 22.055C16.6258 24.065 18.5188 27.782 21.9548 32.521C22.2465 32.9228 22.6292 33.2498 23.0715 33.4753C23.5139 33.7008 24.0033 33.8183 24.4998 33.8183C24.9963 33.8183 25.4858 33.7008 25.9281 33.4753C26.3705 33.2498 26.7531 32.9228 27.0448 32.521C30.4808 27.782 32.3738 24.065 32.3738 22.055C32.3714 19.9675 31.5411 17.9661 30.065 16.4899C28.5888 15.0138 26.5874 14.1834 24.4998 14.181Z"
                    fill="#767676"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_397_12015">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(12.5 12)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
            <p className="text-[#767676]">{data.address}</p>
          </div>
        </div>
      </div>
    </>
  );
}
