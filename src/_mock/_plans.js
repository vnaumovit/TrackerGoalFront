import { PlanFreeIcon, PlanStarterIcon, PlanPremiumIcon } from '../assets';

// ----------------------------------------------------------------------

const LICENSES = ['Нищий', 'Дешевка', 'Человек'];

export const _homePlans = [...Array(3)].map((_, index) => ({
  license: LICENSES[index],
  commons: ['Доступны цели', 'Ограничение до 12 целей', 'Поможем чем сможем'],
  options: [
    'Цели для финансов',
    'Цели для отношений',
    'Цели для технологий',
    'Цели для остольного',
  ],
  icons: [
    'https://atpress.kz/media/2022/02/08/061247822200.jpg?x=22&y=-25&width=733&height=549',
    '//avatars.mds.yandex.net/i?id=883ac8d11ff53b4e31351463de98d562_l-5650815-images-thumbs&n=13',
    '//avatars.mds.yandex.net/i?id=b44153b925eb1e0647cbafa6c47683ba_l-7084676-images-thumbs&n=13',
    '//avatars.mds.yandex.net/i?id=096a32d6ccfe0c0a03262a98c1498632_l-5235458-images-thumbs&n=13',
  ],
}));

export const _pricingPlans = [
  {
    subscription: 'basic',
    icon: <PlanFreeIcon />,
    price: 0,
    caption: 'forever',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: false },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'current plan',
  },
  {
    subscription: 'starter',
    icon: <PlanStarterIcon />,
    price: 4.99,
    caption: 'saving $24 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: false },
      { text: 'Permissions & workflows', isAvailable: false },
    ],
    labelAction: 'choose starter',
  },
  {
    subscription: 'premium',
    icon: <PlanPremiumIcon />,
    price: 9.99,
    caption: 'saving $124 a year',
    lists: [
      { text: '3 prototypes', isAvailable: true },
      { text: '3 boards', isAvailable: true },
      { text: 'Up to 5 team members', isAvailable: true },
      { text: 'Advanced security', isAvailable: true },
      { text: 'Permissions & workflows', isAvailable: true },
    ],
    labelAction: 'choose premium',
  },
];
