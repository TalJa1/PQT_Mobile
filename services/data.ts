export interface CautionAlert {
  id: string;
  type: string;
  area: string;
  time: string;
  dangerLevel: string;
  detailsTitle: string;
  waveHeight?: string;
  wind?: string;
  rainAmount?: string;
  direction?: string;
  mustDo: {
    title: string;
    description: string;
  }[];
}

export const fakeCautionsData: CautionAlert[] = [
  {
    id: '1',
    type: 'BÃO CẤP 3 - 9',
    area: 'Khu vực: Đồng Tháp, An Giang',
    time: 'Từ: 15/05 - 18:00 → 17/05 - 12:00',
    dangerLevel: '03',
    detailsTitle: 'BÃO SỐ 3 - 9',
    waveHeight: 'Sóng cao 3-5m (vùng ven biển)',
    wind: 'Gió cấp 9, giật cấp 11',
    rainAmount: 'Mưa lớn 150-250mm',
    direction: 'Hướng di chuyển: Tây Bắc',
    mustDo: [
      {
        title: 'Theo dõi chặt chẽ thông tin dự báo thời tiết.',
        description:
          'Cập nhật liên tục các bản tin về diễn biến của bão từ các nguồn chính thống.',
      },
      {
        title: 'Gia cố nhà cửa, chằng chống mái tôn, cửa ra vào.',
        description:
          'Đảm bảo ngôi nhà của bạn đủ vững chắc để chống lại gió mạnh.',
      },
      {
        title: 'Neo đậu tàu thuyền an toàn.',
        description:
          'Nếu bạn có tàu thuyền, hãy đưa chúng đến nơi trú ẩn an toàn và neo đậu cẩn thận.',
      },
      {
        title: 'Cắt tỉa cành cây có nguy cơ gãy đổ.',
        description:
          'Loại bỏ những cành cây yếu hoặc có thể gây nguy hiểm khi gió lớn.',
      },
      {
        title: 'Chuẩn bị đèn pin, nến, nước uống và đồ ăn khô.',
        description:
          'Đảm bảo bạn có đủ nhu yếu phẩm cần thiết khi mất điện hoặc khó khăn trong việc di chuyển.',
      },
      {
        title: 'Sạc đầy pin điện thoại và các thiết bị liên lạc.',
        description:
          'Giữ cho các thiết bị liên lạc của bạn luôn sẵn sàng để sử dụng khi cần thiết.',
      },
      {
        title:
          'Di chuyển đến nơi trú ẩn an toàn theo hướng dẫn của chính quyền.',
        description:
          'Nếu khu vực của bạn nằm trong vùng nguy hiểm, hãy tuân thủ hướng dẫn di tản.',
      },
      {
        title: 'Không ra ngoài khi bão đang đổ bộ hoặc có gió mạnh.',
        description:
          'Tránh xa các khu vực nguy hiểm như bờ biển, cây cao, cột điện.',
      },
      {
        title: 'Ngắt nguồn điện và khóa van gas khi có nguy cơ ngập lụt.',
        description:
          'Đảm bảo an toàn cho bản thân và gia đình trong tình huống xấu nhất.',
      },
      {
        title: 'Hỗ trợ và giúp đỡ những người xung quanh nếu có thể.',
        description: 'Thể hiện tinh thần tương thân tương ái trong cộng đồng.',
      },
    ],
  },
  {
    id: '2',
    type: 'LŨ QUÉT CẤP 2',
    area: 'Khu vực: Lào Cai, Yên Bái',
    time: 'Từ: 18/05 - 06:00 → 19/05 - 18:00',
    dangerLevel: '02',
    detailsTitle: 'LŨ QUÉT SỐ 2',
    wind: 'Gió cấp 6, giật cấp 8',
    rainAmount: 'Mưa lớn 100-150mm',
    direction: 'Hướng di chuyển: Đông Nam',
    mustDo: [
      {
        title: 'Theo dõi cảnh báo lũ quét từ cơ quan chức năng.',
        description:
          'Luôn cập nhật thông tin mới nhất về tình hình mưa lũ tại khu vực của bạn.',
      },
      {
        title: 'Sơ tán ngay lập tức đến khu vực cao hơn khi có cảnh báo.',
        description:
          'Không chần chừ, hãy di chuyển đến nơi an toàn khi nhận được thông báo.',
      },
      {
        title: 'Tránh xa các khu vực sông, suối, khe nước khi trời mưa lớn.',
        description: 'Lũ quét có thể xảy ra rất nhanh và nguy hiểm.',
      },
      {
        title: 'Không cố gắng vượt qua các dòng nước chảy xiết.',
        description:
          'Nước lũ có lực chảy rất mạnh, có thể cuốn trôi bất cứ thứ gì.',
      },
      {
        title: 'Di chuyển vật dụng có giá trị lên cao để tránh bị ngập.',
        description: 'Bảo vệ tài sản của bạn khỏi thiệt hại do lũ lụt.',
      },
      {
        title: 'Chuẩn bị sẵn sàng đồ dùng cứu hộ như áo phao, dây thừng.',
        description: 'Đề phòng tình huống khẩn cấp có thể xảy ra.',
      },
      {
        title: 'Thông báo cho người thân và hàng xóm về tình hình lũ quét.',
        description: 'Cùng nhau nâng cao cảnh giác và hỗ trợ lẫn nhau.',
      },
      {
        title: 'Tìm hiểu về các tuyến đường sơ tán an toàn trong khu vực.',
        description: 'Nắm rõ lối đi để di chuyển nhanh chóng khi cần thiết.',
      },
      {
        title:
          'Báo cáo ngay cho chính quyền địa phương nếu phát hiện dấu hiệu lũ quét.',
        description: 'Thông tin kịp thời có thể giúp cứu sống nhiều người.',
      },
      {
        title: 'Sau lũ, kiểm tra kỹ các công trình trước khi sử dụng lại.',
        description: 'Đảm bảo an toàn về điện, nước và kết cấu của ngôi nhà.',
      },
    ],
  },
  {
    id: '3',
    type: 'NẮNG NÓNG GAY GẮT',
    area: 'Khu vực: Toàn bộ miền Trung',
    time: 'Từ: 17/05 - 10:00 → 20/05 - 16:00',
    dangerLevel: '04',
    detailsTitle: 'NẮNG NÓNG ĐỈNH ĐIỂM',
    rainAmount: 'Không mưa, độ ẩm thấp',
    direction: 'Không có gió đáng kể',
    mustDo: [
      {
        title: 'Uống đủ nước thường xuyên.',
        description:
          'Duy trì cơ thể đủ nước bằng cách uống nước lọc, nước trái cây hoặc dung dịch điện giải.',
      },
      {
        title: 'Mặc quần áo sáng màu, thoáng mát.',
        description:
          'Chọn quần áo làm từ chất liệu cotton hoặc lanh để dễ thoát mồ hôi.',
      },
      {
        title: 'Hạn chế ra ngoài trời nắng gắt, đặc biệt vào giữa trưa.',
        description:
          'Tìm bóng râm hoặc ở trong nhà vào thời điểm nhiệt độ cao nhất.',
      },
      {
        title: 'Sử dụng kem chống nắng khi ra ngoài.',
        description: 'Bảo vệ da khỏi tác hại của tia UV.',
      },
      {
        title: 'Đội mũ, đeo kính râm khi đi ra ngoài trời.',
        description: 'Che chắn đầu và mắt khỏi ánh nắng trực tiếp.',
      },
      {
        title: 'Tránh hoạt động thể lực quá sức dưới trời nắng.',
        description:
          'Nếu cần vận động, hãy chọn thời điểm mát mẻ hơn trong ngày.',
      },
      {
        title:
          'Không để trẻ em, người già hoặc vật nuôi trong xe ô tô đóng kín.',
        description:
          'Nhiệt độ bên trong xe có thể tăng rất nhanh và gây nguy hiểm.',
      },
      {
        title: 'Tắm hoặc lau người bằng nước mát để hạ nhiệt.',
        description: 'Giúp cơ thể giải nhiệt và cảm thấy dễ chịu hơn.',
      },
      {
        title: 'Ăn các loại thức ăn dễ tiêu, nhiều rau xanh và trái cây.',
        description: 'Bổ sung vitamin và khoáng chất cần thiết cho cơ thể.',
      },
      {
        title: 'Theo dõi các dấu hiệu say nắng và xử lý kịp thời.',
        description:
          'Nếu có triệu chứng như chóng mặt, buồn nôn, đau đầu, hãy nghỉ ngơi và tìm sự trợ giúp y tế.',
      },
    ],
  },
];

export interface Post {
  id: string;
  avatar: string;
  name: string;
  datetime: string;
  description: string;
  post_image: string;
  location: string;
}

export const PostsData: Post[] = [
  {
    id: 'post1',
    avatar: 'assets/report/avatar.png',
    name: 'Nguyễn Văn An',
    datetime: '17/05/2025, 08:15',
    description: 'Hạn hán làm nứt nẻ nhiều cánh đồng ở Huyện Sơn Động, Tỉnh Bắc Giang. Nguồn nước sinh hoạt và sản xuất bị ảnh hưởng nghiêm trọng.',
    post_image: 'assets/report/drought.jpg',
    location: 'Xã Bình Yên, Huyện Sơn Động, Tỉnh Bắc Giang',
  },
  {
    id: 'post2',
    avatar: 'assets/report/avatar.png',
    name: 'Trần Thị Bích',
    datetime: '18/05/2025, 15:45',
    description: 'Nhiều khu vực tại Thành phố Hạ Long bị ngập sau trận mưa lớn đêm qua. Chính quyền đang khẩn trương khắc phục.',
    post_image: 'assets/report/flood.jpg',
    location: 'Thôn Hoà Bình, Xã Cẩm Phả, Thành phố Hạ Long, Tỉnh Quảng Ninh',
  },
  {
    id: 'post3',
    avatar: 'assets/report/avatar.png',
    name: 'Lê Minh Cường',
    datetime: '19/05/2025, 10:30',
    description: 'Nắng nóng kéo dài khiến nhiều diện tích lúa bị khô héo. Bà con nông dân cần có biện pháp chống hạn kịp thời.',
    post_image: 'assets/report/drought.jpg',
    location: 'Ấp Phú Mỹ, Xã Tân Thành, Huyện Lai Vung, Tỉnh Đồng Tháp',
  },
];

export interface LocationData {
  id: string;
  address: string;
  distance: string;
  type: string; // Display name of the place type (Vietnamese)
  category: string; // A more generic category key, e.g., "education", "health"
}

export const fakeHCMCKLocations: LocationData[] = [
  {
    id: '1',
    address: 'Số 123, Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 500m',
    type: 'Nhà hàng',
    category: 'food_drink',
  },
  {
    id: '2',
    address: 'Số 45, Đường Lê Lợi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 1.2km',
    type: 'Cửa hàng tiện lợi',
    category: 'shopping',
  },
  {
    id: '3',
    address: 'Số 78, Đường Pasteur, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    distance: 'Cách bạn 800m',
    type: 'Quán cà phê',
    category: 'food_drink',
  },
  {
    id: '4',
    address: 'Số 210, Đường Hai Bà Trưng, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 300m',
    type: 'Trường học',
    category: 'education',
  },
  {
    id: '5',
    address: 'Số 55, Đường Cách Mạng Tháng Tám, Phường Phạm Ngũ Lão, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 1.5km',
    type: 'Bệnh viện',
    category: 'health',
  },
  {
    id: '6',
    address: 'Số 300, Đường Điện Biên Phủ, Phường 7, Quận 3, TP. Hồ Chí Minh',
    distance: 'Cách bạn 2.1km',
    type: 'Siêu thị',
    category: 'shopping',
  },
  {
    id: '7',
    address: 'Số 12, Đường Nguyễn Thị Minh Khai, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 650m',
    type: 'Ngân hàng',
    category: 'service',
  },
  {
    id: '8',
    address: 'Số 99, Đường Võ Văn Tần, Phường 6, Quận 3, TP. Hồ Chí Minh',
    distance: 'Cách bạn 900m',
    type: 'Nhà thuốc',
    category: 'health',
  },
  {
    id: '9',
    address: 'Số 180, Đường Xô Viết Nghệ Tĩnh, Phường 21, Quận Bình Thạnh, TP. Hồ Chí Minh',
    distance: 'Cách bạn 3.5km',
    type: 'Chợ',
    category: 'shopping',
  },
  {
    id: '10',
    address: 'Số 67, Đường Phan Xích Long, Phường 2, Quận Phú Nhuận, TP. Hồ Chí Minh',
    distance: 'Cách bạn 2.8km',
    type: 'Nhà hàng',
    category: 'food_drink',
  },
  {
    id: '11',
    address: 'Số 40, Đường Thảo Điền, Phường Thảo Điền, TP. Thủ Đức, TP. Hồ Chí Minh',
    distance: 'Cách bạn 4.0km',
    type: 'Trường Quốc tế',
    category: 'education',
  },
  {
    id: '12',
    address: 'Số 222, Đường Hoàng Diệu, Phường 9, Quận 4, TP. Hồ Chí Minh',
    distance: 'Cách bạn 1.9km',
    type: 'Công viên',
    category: 'recreation',
  },
  {
    id: '13',
    address: 'Số 34, Đường Sư Vạn Hạnh, Phường 12, Quận 10, TP. Hồ Chí Minh',
    distance: 'Cách bạn 2.5km',
    type: 'Trung tâm mua sắm',
    category: 'shopping',
  },
  {
    id: '14',
    address: 'Số 101, Đường Tôn Dật Tiên, Phường Tân Phú, Quận 7, TP. Hồ Chí Minh',
    distance: 'Cách bạn 5.2km',
    type: 'Hồ bơi',
    category: 'recreation',
  },
  {
    id: '15',
    address: 'Số 50, Đường Quang Trung, Phường 10, Quận Gò Vấp, TP. Hồ Chí Minh',
    distance: 'Cách bạn 6.0km',
    type: 'Rạp chiếu phim',
    category: 'entertainment',
  },
  {
    id: '16',
    address: 'Số 15, Đường Trần Hưng Đạo, Phường Cầu Ông Lãnh, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 750m',
    type: 'Nhà sách',
    category: 'shopping',
  },
  {
    id: '17',
    address: 'Số 88, Đường Nguyễn Trãi, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 1.1km',
    type: 'Cửa hàng thời trang',
    category: 'shopping',
  },
  {
    id: '18',
    address: 'Số 250, Đường Âu Cơ, Phường 9, Quận Tân Bình, TP. Hồ Chí Minh',
    distance: 'Cách bạn 4.5km',
    type: 'Phòng gym',
    category: 'health_fitness',
  },
  {
    id: '19',
    address: 'Số 7, Đường Hồ Xuân Hương, Phường Võ Thị Sáu, Quận 3, TP. Hồ Chí Minh',
    distance: 'Cách bạn 1.3km',
    type: 'Spa & Massage',
    category: 'wellness',
  },
  {
    id: '20',
    address: 'Số 33, Đường Lê Văn Sỹ, Phường 13, Quận Phú Nhuận, TP. Hồ Chí Minh',
    distance: 'Cách bạn 2.2km',
    type: 'Tiệm bánh',
    category: 'food_drink',
  },
  {
    id: '21',
    address: 'Số 190, Đường Hồng Bàng, Phường 12, Quận 5, TP. Hồ Chí Minh',
    distance: 'Cách bạn 3.8km',
    type: 'Bệnh viện Y học cổ truyền',
    category: 'health',
  },
  {
    id: '22',
    address: 'Số 4, Đường Tôn Đức Thắng, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    distance: 'Cách bạn 950m',
    type: 'Bảo tàng',
    category: 'culture_history',
  },
];
