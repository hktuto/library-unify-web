import dayjs from "dayjs";
export const useEvents = () => {
  const { find } = useStrapi();
  const allEvents = useState<any[]>("allEvents", () => []);
  const loading = ref(false);

  const { currentLang } = useLang({});
  const started = useState("started", () => false);
  async function getAllEvents() {
    loading.value = true;
    const res = await find<any[]>("events", {
      populate: {
        programs: {
          populate: "*",
        },
        categories: {
          populate: "*",
        },
      },
      pagination: {
        start: 0,
        limit: 1000,
      },
    });
    allEvents.value = res.data;
    loading.value = false;
  }

  function sortForSchedule(events: any[]) {
    const result: any[] = [];

    for (const event of events) {
      const { programs } = event;

      for (const program of programs) {
        const newEvent = {
          name: event.title_EN,
          title_EN: event.title_EN,
          title_HK: event.title_HK,
          location_HK: event.location_HK,
          location_EN: event.location_EN,
          ...program,
          id: event.id + "-" + program.id,
          categories: event.categories.data || [],
          postId: event.id,
        };

        const programEvents = result.findIndex(
          (e: any) => e.id === event.id + "-" + program.id,
        );
        if (programEvents === -1 && newEvent.startDate && newEvent.endDate) {
          result.push(newEvent);
        }
      }
    }
    result.sort((a, b) => a.name.localeCompare(b.name));
    result.sort((a, b) => {
      return Number(new Date(a.startDate)) - Number(new Date(b.startDate));
    });
    return result;
  }

  function sortForCalendar(events: any[]) {
    const result: any[] = [];
    for (const item of events) {
      const { programs } = item;

      let calculatedPrograms: any = {};

      for (const p of programs) {
        // calculate all start and end dated, do the date range does not overlap

        // step 1 loop thought start and end date
        // step 2 add item to calculatedPrograms using the date as key
        const startDate = dayjs(p.startDate);
        const endDate = dayjs(p.endDate);
        const dateRange = endDate.diff(startDate, "day");
        let currentDate = startDate;
        for (let i = -1; i < dateRange; i++) {
          const currentDateString = currentDate.format("YYYY-MM-DD");
          if (!calculatedPrograms[currentDateString]) {
            const newEvent = {
              id: item.id,
              bar: true,
              name: item.title_EN,
              key: p.startDate + item.title_EN,
              hideIndicator: true,
              customData: { event: item, program: p, id: item.id },
              popover: true,
              dates: new Date(currentDateString),
            };
            calculatedPrograms[currentDateString] = newEvent;
          }
          currentDate = currentDate.add(1, "day");
        }

        // convert calculatedPrograms to array
        // const calculatedProgramsArray = Object.values(calculatedPrograms);
        // result.push(...calculatedProgramsArray);
      }
      const calculatedProgramsArray = Object.values(calculatedPrograms);
      result.push(...calculatedProgramsArray);
    }
    result.sort((a, b) => a.name.localeCompare(b.name));
    result.sort((a, b) => {
      return Number(new Date(a.startDate)) - Number(new Date(b.startDate));
    });
    return result;
  }

  const calendarLang = computed(() => {
    return currentLang.value === "EN"
      ? "en"
      : currentLang.value === "HK"
        ? "zh-hk"
        : "zh-cn";
  });

  onMounted(async () => {
    if (allEvents.value.length === 0 && !started.value) {
      started.value = true;
      await getAllEvents();
    }
  });
  return {
    allEvents,
    sortForSchedule,
    calendarLang,
    loading,
    sortForCalendar,
  };
};
