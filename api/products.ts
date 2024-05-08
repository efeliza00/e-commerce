type Product =
  {
    category: string;
    description: string;
    id: number;
    image: string;
    price: number;
    rating: {
      rate: string;
      count: number;
    };
    title: string;
  };

export const getHeroProducts =
  async () => {
    try {
      const res: Product[] =
        await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/products?limit=3`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };

export const getSuggestedProducts =
  async () => {
    try {
      const res: Product[] =
        await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/products?limit=10`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };

export const getProductCategories =
  async () => {
    try {
      const res: string[] =
        await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/products/categories`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };

export const getItemProduct =
  async (
    id: string
  ) => {
    try {
      const res: Product =
        await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/products/${id}`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };

export const getProducts =
  async (
    category: string,
    sort: string
  ) => {
    try {
      const res: Product[] =
        await fetch(
          `${
            process
              .env
              .NEXT_PUBLIC_FAKESTORE_API
          }/${
            category ===
            "products"
              ? `products/?sort=${sort}`
              : `products/category/${category}?sort=${sort}`
          }`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };

export const getCart =
  async () => {
    try {
      const res =
        await fetch(
          `${process.env.NEXT_PUBLIC_FAKESTORE_API}/carts/user/1`
        ).then(
          (
            res
          ) =>
            res.json()
        );

      return res;
    } catch (error) {
      throw error;
    }
  };
