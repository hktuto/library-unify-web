export const useDistrict = () => {
    const { find } = useStrapi()
    const bigDistrict = [
        {
            label_EN:"Hong Kong Island",
            label_HK:"香港島",
            value:"hong_kong_island"
        },
        {
            label_EN:"Kowloon",
            label_HK:"九龍",
            value:"kowloon"
        },
        {
            label_EN:"New Territories",
            label_HK:"新界",
            value:"NT"
        },
    ]
    const allDistrict = useState<any>('allDistrict', () => ([]));

    onMounted(async () => {
        const data = await find<any>('districts',{
            populate:'*',
        })
        allDistrict.value = data.data;
    })

    return {
        allDistrict,
        bigDistrict
    }
}