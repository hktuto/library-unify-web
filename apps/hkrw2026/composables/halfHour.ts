export const useHalfHour = () => {
    const { find } = useStrapi()
    const loading = useState('half_loading', () =>true);
    const halfHour = useState<any>('halfHour', () => ([]));
    const started = useState('Half_started', () => false)
    async function getAllHalfHour() {
        loading.value = true;
        const { data } = await find<any>('half-an-hours',{
            populate:{
                district: {
                    populate: "*"
                },
                images:{
                    populate: "*"
                }
            },
            sort: ["startDate","startTime"],
            pagination:{
                start:0,
                limit:1000,
            }
        })
        halfHour.value = data
        loading.value = false;
    }
    onMounted( async() => {
        if(halfHour.value.length === 0 && !started.value) {
            started.value = true;
            await getAllHalfHour();
        }
        
    })
    return {
        getAllHalfHour,
        halfHour
    }
}