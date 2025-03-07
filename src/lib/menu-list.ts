import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "테스트 화면",
      menus: [
        {
          href: "",
          label: "화면들",
          icon: SquarePen,
          submenus: [
            {
              label: "관리자 ",
              href: "/forms/input",
            },
            {
              label: "관리자 계정 관리",
              href: "/forms/input",
            },
            {
              label: "팝업화면 테스트",
              href: "/forms/dialog",
            },
            {
              label: "그리드 화면(로컬 페이징)",
              href: "/forms/datatable-local",
            },
            {
              label: "그리드 화면(서버 페이징)",
              href: "/forms/datatable-server",
            },
            {
              label: "시스템 설정(덜됨)",
              href: "/forms/systemsetting",
            },
            {
              label: "화면 grid tag 테스트",
              href: "/forms/test01",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts",
            },
            {
              href: "/posts/new",
              label: "New Post",
            },
          ],
        },
        {
          href: "/categories",
          label: "Categories",
          icon: Bookmark,
        },
        {
          href: "/tags",
          label: "Tags",
          icon: Tag,
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
