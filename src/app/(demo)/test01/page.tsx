import { Input } from "@/components/ui/input";

export default function PostsPage() {
  return (
    <>
      <div className="pb-2">
        <h1>: 테스트 10</h1>
      </div>
      <div className="flex w-full h-full p-4 bg-red-400">
        <div className="grid grid-cols-2 w-full gap-4 bg-green-400">
          <div className="bg-yellow-400 p-5">
            <p>이메일1</p>
            <Input
              id="email"
              type="email"
              required
              placeholder="이메일을 입력해주세요."
            />
          </div>
          <div className="grid grid-rows-2 w-full gap-4 bg-green-400">
            <div className="bg-yellow-100">
              <p>이메일2-1</p>
              <Input
                id="email"
                type="email"
                required
                placeholder="이메일을 입력해주세요."
              />
            </div>
            <div className="bg-yellow-100">
              <p>이메일2-2</p>
              <Input
                id="email"
                type="email"
                required
                placeholder="이메일을 입력해주세요."
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
