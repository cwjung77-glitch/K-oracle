import { Solar } from 'lunar-javascript';

const HEAVENLY_STEMS_KR = {
  '甲': 'Gap (Yang Wood)', '乙': 'Eul (Yin Wood)',
  '丙': 'Byeong (Yang Fire)', '丁': 'Jeong (Yin Fire)',
  '戊': 'Mu (Yang Earth)', '己': 'Gi (Yin Earth)',
  '庚': 'Gyeong (Yang Metal)', '辛': 'Sin (Yin Metal)',
  '壬': 'Im (Yang Water)', '癸': 'Gye (Yin Water)'
};

const EARTHLY_BRANCHES_KR = {
  '子': 'Ja (Rat)', '丑': 'Chuk (Ox)', '寅': 'In (Tiger)', '卯': 'Myo (Rabbit)',
  '辰': 'Jin (Dragon)', '巳': 'Sa (Snake)', '午': 'O (Horse)', '未': 'Mi (Goat)',
  '申': 'Sin (Monkey)', '酉': 'Yu (Rooster)', '戌': 'Sul (Dog)', '亥': 'Hae (Pig)'
};

export function getSajuFromDate(dateString) {
  if (!dateString) return null;
  const parts = dateString.split('-');
  if (parts.length !== 3) return null;

  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  
  const solar = Solar.fromYmd(year, month, day);
  const lunar = solar.getLunar();
  const bazi = lunar.getEightChar();

  const yearGan = bazi.getYearGan();
  const yearZhi = bazi.getYearZhi();
  const monthGan = bazi.getMonthGan();
  const monthZhi = bazi.getMonthZhi();
  const dayGan = bazi.getDayGan();
  const dayZhi = bazi.getDayZhi();

  return {
    year: {
      stem: HEAVENLY_STEMS_KR[yearGan] || yearGan,
      branch: EARTHLY_BRANCHES_KR[yearZhi] || yearZhi,
      hanja: `${yearGan}${yearZhi}`
    },
    month: {
      stem: HEAVENLY_STEMS_KR[monthGan] || monthGan,
      branch: EARTHLY_BRANCHES_KR[monthZhi] || monthZhi,
      hanja: `${monthGan}${monthZhi}`
    },
    day: {
      stem: HEAVENLY_STEMS_KR[dayGan] || dayGan,
      branch: EARTHLY_BRANCHES_KR[dayZhi] || dayZhi,
      hanja: `${dayGan}${dayZhi}`
    }
  };
}
