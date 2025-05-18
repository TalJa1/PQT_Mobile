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

interface Action {
  title: string;
  description: string;
}

interface ThienTai {
  id: number;
  name: string;
  actions: Action[];
}

export const thienTaiData: ThienTai[] = [
  {
    id: 1,
    name: 'Bão',
    actions: [
      {
        title: 'Theo dõi dự báo thời tiết',
        description:
          'Cập nhật thường xuyên các bản tin dự báo thời tiết để nắm bắt thông tin về bão.',
      },
      {
        title: 'Gia cố nhà cửa',
        description:
          'Chằng chống mái tôn, cửa ra vào và cửa sổ để tránh bị tốc mái, hư hỏng.',
      },
      {
        title: 'Cắt tỉa cây cối',
        description:
          'Loại bỏ cành cây lớn, cây yếu gần nhà để phòng tránh đổ gãy gây nguy hiểm.',
      },
      {
        title: 'Chuẩn bị đồ dùng khẩn cấp',
        description:
          'Sẵn sàng đèn pin, nến, nước uống đóng chai và đồ ăn khô dự trữ.',
      },
      {
        title: 'Bảo vệ tài sản',
        description:
          'Di chuyển đồ đạc, tài sản có giá trị lên khu vực cao ráo, tránh ngập lụt.',
      },
      {
        title: 'Ngắt thiết bị điện',
        description:
          'Tắt các thiết bị điện khi có mưa bão lớn để tránh chập cháy.',
      },
      {
        title: 'Tìm nơi trú ẩn an toàn',
        description: 'Di chuyển đến nơi trú ẩn kiên cố khi bão đổ bộ.',
      },
      {
        title: 'Không ra ngoài khi bão',
        description:
          'Tuyệt đối không đi ra ngoài trong thời gian bão đang diễn ra.',
      },
      {
        title: 'Liên hệ cứu hộ',
        description:
          'Thông báo ngay cho chính quyền địa phương nếu cần sự hỗ trợ cứu hộ.',
      },
      {
        title: 'Khắc phục sau bão',
        description:
          'Kiểm tra và tiến hành sửa chữa những thiệt hại sau khi bão tan.',
      },
    ],
  },
  {
    id: 2,
    name: 'Lũ',
    actions: [
      {
        title: 'Cập nhật cảnh báo lũ',
        description:
          'Theo dõi sát sao các thông tin cảnh báo lũ từ cơ quan chức năng.',
      },
      {
        title: 'Sơ tán khẩn cấp',
        description:
          'Di chuyển người và tài sản đến vùng đất cao, an toàn khi có lệnh hoặc nguy cơ lũ.',
      },
      {
        title: 'Ngắt nguồn điện',
        description:
          'Tắt cầu dao điện để phòng tránh tai nạn điện giật do ngập nước.',
      },
      {
        title: 'Không lội nước nguy hiểm',
        description: 'Tuyệt đối không cố gắng đi qua vùng nước chảy xiết.',
      },
      {
        title: 'Chuẩn bị phương tiện cứu sinh',
        description: 'Sẵn sàng thuyền, phao cứu sinh (nếu có điều kiện).',
      },
      {
        title: 'Dự trữ nhu yếu phẩm',
        description:
          'Chuẩn bị nước uống, lương thực khô và thuốc men cần thiết.',
      },
      {
        title: 'Giữ liên lạc',
        description:
          'Duy trì liên lạc với chính quyền địa phương để nhận thông tin và hỗ trợ.',
      },
      {
        title: 'Tuân thủ sơ tán',
        description:
          'Thực hiện nghiêm túc hướng dẫn sơ tán của lực lượng cứu hộ.',
      },
      {
        title: 'Vệ sinh sau lũ',
        description:
          'Kiểm tra và đảm bảo vệ sinh nguồn nước, thực phẩm sau khi lũ rút.',
      },
      {
        title: 'Ổn định cuộc sống',
        description:
          'Tham gia vào công tác khôi phục nhà cửa và ổn định cuộc sống sau lũ.',
      },
    ],
  },
  {
    id: 3,
    name: 'Cháy rừng',
    actions: [
      {
        title: 'Nâng cao ý thức phòng cháy',
        description:
          'Tuyên truyền và thực hiện nghiêm các quy định về phòng cháy chữa cháy rừng.',
      },
      {
        title: 'Không gây cháy',
        description:
          'Tuyệt đối không đốt lửa, vứt tàn thuốc bừa bãi trong hoặc gần khu vực rừng.',
      },
      {
        title: 'Báo cháy kịp thời',
        description:
          'Thông báo ngay lập tức cho cơ quan chức năng khi phát hiện đám cháy rừng.',
      },
      {
        title: 'Tham gia chữa cháy (nếu có)',
        description:
          'Hỗ trợ lực lượng chữa cháy rừng nếu được huy động và có kỹ năng phù hợp.',
      },
      {
        title: 'Sơ tán khỏi vùng nguy hiểm',
        description:
          'Nhanh chóng di chuyển người và tài sản ra khỏi khu vực có nguy cơ cháy lan.',
      },
      {
        title: 'Bảo vệ hô hấp',
        description:
          'Che chắn mặt và cơ thể bằng vải ướt để tránh hít phải khói bụi.',
      },
      {
        title: 'Di chuyển theo hướng an toàn',
        description:
          'Di chuyển theo hướng ngược gió để tránh bị ngạt khói và lửa.',
      },
      {
        title: 'Tìm nguồn nước dập lửa',
        description:
          'Sử dụng nguồn nước gần nhất để dập lửa hoặc làm ướt quần áo bảo vệ.',
      },
      {
        title: 'Gọi cấp cứu khi bị thương',
        description:
          'Liên hệ ngay với dịch vụ cấp cứu nếu có người bị thương do cháy.',
      },
      {
        title: 'Hợp tác khắc phục',
        description:
          'Phối hợp với các lực lượng chức năng trong công tác chữa cháy và xử lý hậu quả.',
      },
    ],
  },
  {
    id: 4,
    name: 'Sạt lở',
    actions: [
      {
        title: 'Quan sát dấu hiệu sạt lở',
        description:
          'Chú ý theo dõi các vết nứt trên đất, tường, hiện tượng cây nghiêng bất thường.',
      },
      {
        title: 'Sơ tán lập tức',
        description:
          'Di chuyển ngay đến nơi an toàn khi phát hiện nguy cơ sạt lở.',
      },
      {
        title: 'Tránh xa khu vực nguy hiểm',
        description: 'Không đến gần các khu vực có nguy cơ sạt lở cao.',
      },
      {
        title: 'Báo cáo chính quyền',
        description:
          'Thông báo cho chính quyền địa phương về tình hình sạt lở hoặc nguy cơ sạt lở.',
      },
      {
        title: 'Không xây dựng nơi nguy hiểm',
        description:
          'Tránh xây dựng nhà cửa ở khu vực có địa chất yếu, dễ sạt lở.',
      },
      {
        title: 'Gia cố phòng ngừa',
        description:
          'Thực hiện các biện pháp gia cố tại các khu vực có nguy cơ sạt lở (nếu có thể).',
      },
      {
        title: 'Chuẩn bị cứu hộ cơ bản',
        description:
          'Sẵn sàng các vật dụng cứu hộ cần thiết như dây thừng, đèn pin.',
      },
      {
        title: 'Tìm nơi trú ẩn an toàn',
        description: 'Di chuyển đến nơi trú ẩn vững chắc khi sạt lở xảy ra.',
      },
      {
        title: 'Cảnh giác sạt lở thứ cấp',
        description: 'Đề phòng các đợt sạt lở tiếp theo sau mưa lớn kéo dài.',
      },
      {
        title: 'Hợp tác khắc phục hậu quả',
        description:
          'Tham gia vào các hoạt động khắc phục hậu quả sạt lở do chính quyền tổ chức.',
      },
    ],
  },
  {
    id: 5,
    name: 'Hạn hán',
    actions: [
      {
        title: 'Tiết kiệm nước',
        description:
          'Sử dụng nước một cách hợp lý và tiết kiệm trong sinh hoạt hàng ngày.',
      },
      {
        title: 'Tích trữ nước',
        description: 'Chủ động tích trữ nước sạch khi có điều kiện.',
      },
      {
        title: 'Tìm kiếm nguồn nước khác',
        description: 'Tìm kiếm và khai thác các nguồn nước thay thế (nếu có).',
      },
      {
        title: 'Ưu tiên nước sinh hoạt',
        description:
          'Đảm bảo ưu tiên nguồn nước cho các nhu cầu sinh hoạt thiết yếu.',
      },
      {
        title: 'Theo dõi thông tin hạn hán',
        description:
          'Cập nhật thường xuyên thông tin về tình hình hạn hán từ các cơ quan chức năng.',
      },
      {
        title: 'Điều chỉnh canh tác',
        description:
          'Thay đổi lịch gieo trồng và lựa chọn cây trồng phù hợp với điều kiện khô hạn.',
      },
      {
        title: 'Chăm sóc cây trồng, vật nuôi',
        description:
          'Áp dụng các biện pháp chăm sóc đặc biệt để giảm thiểu thiệt hại cho cây trồng và vật nuôi.',
      },
      {
        title: 'Báo cáo tình hình thiếu nước',
        description:
          'Thông báo cho chính quyền địa phương về tình trạng thiếu nước.',
      },
      {
        title: 'Hỗ trợ cộng đồng',
        description:
          'Tham gia các hoạt động hỗ trợ người dân bị ảnh hưởng bởi hạn hán.',
      },
      {
        title: 'Áp dụng biện pháp chống hạn lâu dài',
        description: 'Tìm hiểu và thực hiện các giải pháp chống hạn bền vững.',
      },
    ],
  },
];
