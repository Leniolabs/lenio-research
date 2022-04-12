import countryInfo from './countryInfo.json';
const getCountryInfo = (countryName) => {
    return countryInfo[countryName] ?? { countryCode: 'xx', continent: '-' };
}
export const CountryFlag = ({ countryName }) => {
    const { countryCode } = getCountryInfo(countryName);
    return (<img
        src={`https://hatscripts.github.io/circle-flags/flags/${countryCode.toLowerCase()}.svg`}
        preserveAspectRatio="none"
        width="24"
        height="24"
    />
    )
}
export default getCountryInfo;
