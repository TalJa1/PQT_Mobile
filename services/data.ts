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
