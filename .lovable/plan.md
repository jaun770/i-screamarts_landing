

# 영어 버전 Impact 섹션 숫자 포맷 변경

## 요약
영어 버전에서 그림 데이터 숫자를 "1.0M" 대신 "1,000K"로 표시하여, 숫자가 무럭무럭 커지는 느낌을 주도록 수정합니다.

---

## 현재 상태

**파일:** `src/pages/corporate/HomePage.tsx` (Line 56)

```tsx
{isMillions && language === 'ko' 
  ? `${Math.floor(count / 10000)}만` 
  : isMillions 
    ? `${(count / 1000000).toFixed(1)}M`  // ← 현재: "1.0M"
    : count}
```

**문제점:**
- 영어 버전에서 1,000,000을 1,000,000으로 나눠서 "1.0M"으로 표시
- 숫자가 작아 보이고, 애니메이션 중에도 소수점 자릿수만 변화하여 성장감이 부족

---

## 변경 내용

### 파일: `src/pages/corporate/HomePage.tsx`

**위치:** Line 56

**변경 전:**
```tsx
{isMillions && language === 'ko' ? `${Math.floor(count / 10000)}만` : isMillions ? `${(count / 1000000).toFixed(1)}M` : count}
```

**변경 후:**
```tsx
{isMillions && language === 'ko' ? `${Math.floor(count / 10000)}만` : isMillions ? `${Math.floor(count / 1000).toLocaleString()}K` : count}
```

---

## 변경 효과

| 항목 | 변경 전 | 변경 후 |
|------|---------|---------|
| 최종 표시 | 1.0M+ | 1,000K+ |
| 애니메이션 중 | 0.0M → 0.5M → 1.0M | 0K → 500K → 1,000K |
| 시각적 효과 | 소수점 변화만 | 숫자가 크게 증가하는 느낌 |

---

## 기술적 세부사항

- `Math.floor(count / 1000)`: 1,000 단위로 나눠서 K(천) 단위로 표시
- `.toLocaleString()`: 천 단위 구분 쉼표 추가 (1000 → "1,000")
- 한글 버전(`만` 단위)은 그대로 유지

