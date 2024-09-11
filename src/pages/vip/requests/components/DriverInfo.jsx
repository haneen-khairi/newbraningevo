import { useTranslation } from "react-i18next";
export default function DriverInfo({driver, children}){
    const {i18n} = useTranslation()
    return (
        <div className={'flex flex-col gap-2 p-3 rounded-xl border border-solid'} style={{
            borderColor: "#ECECEC",
            boxShadow: '0px 4px 75px 0px #0000000F'
        }}>
            <div className={'flex items-center justify-between'}>
                <div className={'flex items-center gap-2'}>
                    <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.99996 12.5C13.309 12.5 16 9.809 16 6.5C16 3.191 13.309 0.5 9.99996 0.5C6.69096 0.5 3.99996 3.191 3.99996 6.5C3.99996 9.809 6.69096 12.5 9.99996 12.5ZM9.99996 3.5C11.654 3.5 13 4.846 13 6.5C13 8.154 11.654 9.5 9.99996 9.5C8.34596 9.5 6.99996 8.154 6.99996 6.5C6.99996 4.846 8.34596 3.5 9.99996 3.5ZM14.934 22.786C15.053 23.606 14.577 24.5 13.448 24.5C12.715 24.5 12.073 23.961 11.966 23.214C11.824 22.236 10.98 21.5 10.001 21.5C9.02196 21.5 8.17696 22.237 8.03596 23.214C7.91796 24.034 7.15796 24.603 6.33696 24.484C5.51696 24.366 4.94796 23.605 5.06696 22.785C5.41996 20.342 7.54096 18.499 10.001 18.499C12.461 18.499 14.583 20.341 14.935 22.785L14.934 22.786ZM19.972 22.913C20.02 23.74 19.389 24.45 18.562 24.498C18.532 24.499 18.502 24.5 18.473 24.5C17.684 24.5 17.023 23.885 16.977 23.087C16.762 19.393 13.697 16.5 9.99996 16.5C6.30296 16.5 3.23796 19.394 3.02296 23.087C2.97496 23.914 2.26296 24.54 1.43796 24.497C0.610957 24.449 -0.0200427 23.739 0.0279573 22.912C0.335957 17.634 4.71596 13.499 9.99996 13.499C15.284 13.499 19.664 17.634 19.972 22.913Z"
                            fill="#E30101"/>
                    </svg>
                    <p>
                        {i18n.language == "ar" ? driver?.fullName : driver?.fullNameEn}
                    </p>
                </div>
                <div className={'flex flex-col gap-2'}>
                    <p>{i18n.language == "ar" ? driver?.carInfo?.nameAr : driver?.carInfo?.nameEn}</p>
                    <p className={'text-[#767676]'}>
                        {i18n.language == "ar" ? driver?.carInfo?.plateNumber : driver?.carInfo?.plateNumberEn}
                    </p>
                </div>
            </div>
            <div className={'border-t border-[#EFEFEF] border-solid'} />
            {children}
        </div>
    )
}