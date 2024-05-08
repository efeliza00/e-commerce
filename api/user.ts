type User = { 
    
}

export const getUser =
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