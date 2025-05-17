export interface CautionAlert {
  id: string;
  type: string; // e.g., "BÃO CẤP 3 - 9"
  area: string; // e.g., "Khu vực: Đồng Tháp, An Giang"
  time: string; // e.g., "Từ: 15/05 - 18:00 → 17/05 - 12:00"
  dangerLevel: string; // e.g., "03"
  detailsTitle: string; // e.g., "BÃO SỐ 3 - 9"
  waveHeight?: string;
  wind?: string;
  rainAmount?: string;
  direction?: string;
  // For icons, we'll reference them in the component
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
  },
];
