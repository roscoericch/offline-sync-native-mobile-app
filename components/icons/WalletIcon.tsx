import SVG, { Path } from "react-native-svg";

const WalletIcon = ({color}:{color:string}) => {
  return (
    <SVG width="32" height="25" viewBox="0 0 32 25" fill="none">
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M23.1992 8.22066H27.7388V7.53232C27.0283 4.88503 25.2223 4.9023 22.9895 4.9245C22.6219 4.92944 22.2888 4.93191 22.2691 4.93191H5.29976C4.90994 4.93191 4.59414 4.61611 4.59414 4.22629C4.59414 3.83647 4.90994 3.52067 5.29976 3.52067H22.2691C22.7699 3.52067 22.876 3.52067 22.9771 3.51821C24.8867 3.49847 26.5546 3.4812 27.7388 4.59883V4.27563C27.7388 3.48613 27.4156 2.77065 26.895 2.25007C26.3745 1.7295 25.6565 1.4063 24.8695 1.4063H5.11965C4.33015 1.4063 3.61467 1.7295 3.09409 2.25007C2.57352 2.77065 2.25032 3.4886 2.25032 4.27563V20.717C2.25032 21.5065 2.57352 22.2219 3.09409 22.7425C3.61467 23.2631 4.33262 23.5863 5.11965 23.5863H24.867C25.6565 23.5863 26.372 23.2631 26.8926 22.7425C27.4131 22.2219 27.7363 21.504 27.7363 20.717V18.383H23.1967C21.8274 18.383 20.5815 17.823 19.681 16.9224C18.7805 16.0219 18.2204 14.776 18.2204 13.4067V13.192C18.2204 11.8228 18.7805 10.5768 19.681 9.6763C20.584 8.78072 21.8274 8.22066 23.1992 8.22066ZM29.1476 8.2478C29.6583 8.32429 30.1147 8.56607 30.4626 8.91641C30.8919 9.3457 31.1559 9.93783 31.1559 10.5892V15.9183C31.1559 16.5992 30.8795 17.216 30.433 17.6626C30.09 18.0055 29.6435 18.2498 29.1476 18.3435V20.7194C29.1476 21.8963 28.6665 22.967 27.8918 23.7417C27.1171 24.5164 26.0463 24.9975 24.8695 24.9975H5.11965C3.94281 24.9975 2.87205 24.5164 2.09735 23.7417C1.32265 22.9695 0.841553 21.8987 0.841553 20.7219V4.2781C0.841553 3.10125 1.32265 2.03049 2.09735 1.2558C2.87205 0.481101 3.94281 0 5.11965 0H24.867C26.0439 0 27.1146 0.481101 27.8893 1.2558C28.664 2.03049 29.1451 3.10125 29.1451 4.2781V8.2478H29.1476ZM22.5873 11.3762C23.5865 11.3762 24.3958 12.1854 24.3958 13.1846C24.3958 14.1839 23.5865 14.9931 22.5873 14.9931C21.5881 14.9931 20.7789 14.1839 20.7789 13.1846C20.7789 12.1854 21.5881 11.3762 22.5873 11.3762Z" fill={color}/>
</SVG>
  )
}

export default WalletIcon