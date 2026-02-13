export const useCategories = () => {
  const { find } = useStrapi();
  const categories = useState<any>("categories", () => []);
  const { tObj } = useLang({});
  onMounted(async () => {
    const { data } = await find<any>("categories", {
      populate: "*",
      filters: {
        showInHome: {
          $eq: true,
        },
      },
      sort: "order",
    });
    categories.value = data;
    console.log("categories", categories.value);
  });

  const searchCategory = computed(() =>
    categories.value
      .filter((category: any) => !category.externalURL)
      .map((category: any) => ({
        name: tObj("name_", category),
        value: category.id,
      })),
  );

  return {
    categories,
    searchCategory,
  };
};
