// src/app/cats/[id]/page.tsx
import { fetchCatById } from "@/lib/catApi";

interface Props {
  params: { id: string };
}

export default async function CatDetail({ params }: Props) {
  const cat = await fetchCatById(params.id);

  return (
    <div>
      <section>{/* swiperでスライダー2ついれる */}</section>
      <section>
        <h1>{cat.name}</h1>

        <div>
          <div>
            <h2>基本情報</h2>
            <ul>
              <li>
                <div>毛色</div>
                <div>{cat.color}</div>
              </li>
              <li>
                <div>募集地域</div>
                <div>{cat.prefecture}</div>
              </li>
              <li>
                <div>年齢</div>
                <div>{cat.age}</div>
              </li>
              <li>
                <div>性別</div>
                <div>{cat.gender}</div>
              </li>
              <li>
                <div>避妊・去勢</div>
                <div>{cat.neuter}</div>
              </li>
              <li>
                <div>その他条件</div>
                <div>{cat.other}</div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
