import SingleProduct from "../components/SingleProduct";
import { fetchProducts } from "../services/index";
import UserDropdown from "../components/UserDropdown";
import { cookies } from "next/headers";

export default async function Products() {
    const products = await fetchProducts();
    const cookiesList = cookies();
    const userName = cookiesList.get("user")?.value;

    return (
        <div className="min-h-full flex flex-col relative">
            {userName ? <UserDropdown userName={userName} /> : null}
            <div className="flex flex-col gap-6 max-w-6xl mx-auto my-32 px-3 py-3 relative">
                {products?.data?.data.map((product) => {
                    const { product_id, title, body, image_url, prices } = product;
                    return (
                        <SingleProduct
                            key={product_id}
                            title={title}
                            body={body}
                            imageUrl={image_url}
                            price={prices[0]?.price}
                            memberPrice={prices[0]?.member_price}
                        />
                    );
                })}
            </div>
        </div>
    );
}
