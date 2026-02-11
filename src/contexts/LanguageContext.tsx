// Language context for i-Scream arts corporate hub - rebuild trigger
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  ko: {
    // Brand
    'brand.name': '아이스크림아트',
    'brand.tagline': '아트 × 교육 × 테크놀로지',
    
    // Navigation
    'nav.home': '홈',
    'nav.about': '회사 소개',
    'nav.products': '제품',
    'nav.blog': '블로그',
    'nav.news': '뉴스',
    'nav.contact': '문의하기',
    
    // CTAs (Corporate-appropriate only)
    'cta.explore_products': '제품 살펴보기',
    'cta.read_blog': '블로그 읽기',
    'cta.contact': '문의하기',
    'cta.partnership': '파트너십 문의',
    'cta.learn_more': '더 알아보기',
    
    // Home - Hero (visible copy)
    'home.headline': '전세계 어린이 행복 네트워크',
    'home.slogan': '아이들의 행복, 아트봉봉에서 시작합니다.',
    'home.micro': 'i-Scream arts는 ART BONBON을 통해 드로잉 스킬·글로벌 갤러리·정서 케어 경험을 만드는 디지털 아트 기반 글로벌 에듀테크 기업입니다.',
    
    // Home - What We Do
    'home.whatwedo.title': 'What We Do',
    'home.whatwedo.subtitle': '아이들의 행복은 아트봉봉에서 시작합니다',
    'home.whatwedo.talent.title': '숨은 재능·적성 파악',
    'home.whatwedo.talent.desc': '작품 데이터 분석을 통해 숨겨진 재능과 적성, 진로를 발견합니다',
    'home.whatwedo.global.title': '글로벌 인재 발굴',
    'home.whatwedo.global.desc': '전 세계 어린이의 재능을 발굴하고 글로벌 아티스트로 성장할 기회를 제공합니다',
    'home.whatwedo.care.title': '마음 건강·정서 케어',
    'home.whatwedo.care.desc': 'SEL 기반 심리 케어로 정서적 위기를 조기 발견하고 회복탄력성을 강화합니다',
    
    // (Solution keys moved to section 117+)
    
    // Home - How It Works
    'home.howitworks.title': 'How It Works',
    'home.howitworks.subtitle': '전세계 아이들 누구나 즐겁고 행복하게 그림을 그릴 수 있는 드로잉 툴',
    'home.howitworks.tagline': '새로운 언어: 드로잉 스킬',
    'home.howitworks.watercolor.title': '수채화 툴',
    'home.howitworks.watercolor.desc': '물감이 번지는 실제 수채화 느낌',
    'home.howitworks.oil.title': '유화 툴',
    'home.howitworks.oil.desc': '붓의 터치가 살아있는 유화 표현',
    'home.howitworks.classes.title': '340+ 수업',
    'home.howitworks.classes.desc': '관심사 기반 맞춤 수업',
    'home.howitworks.live.title': '실시간 1:1 수업',
    'home.howitworks.live.desc': '전문 강사와 실시간 인터랙티브 수업',
    'home.howitworks.screenshot.placeholder': '드로잉 툴 스크린샷',
    
    // (Impact keys moved to section 145+)
    // Home - SEO-only (long definition for meta/schema)
    'home.definition': '아이스크림아트는 교육 현장에서 교사와 학습자의 창의적·표현적·정서적 학습을 지원하는 디지털 도구·프로그램·플랫폼을 개발하는 아트 테크 기업입니다.',
    'home.subline': '전세계 어린이 행복 네트워크',
    
    // Home - Core Services (Section 2) - from deck categories
    'home.services.title': '핵심 서비스',
    'home.services.drawing.title': '드로잉 툴',
    'home.services.drawing.desc': '수채화, 유화, 수묵화 등 다양한 디지털 드로잉 도구',
    'home.services.class.title': '인터랙티브 클래스',
    'home.services.class.desc': '참여형 미술 수업 및 창작 활동 지원',
    'home.services.ai.title': 'AI 기술 및 솔루션',
    'home.services.ai.desc': '그림-심리 빅데이터 기반 AI 분석 및 튜터링',
    'home.services.education.title': '미술교육 & AI 시스템',
    'home.services.education.desc': 'AI 기반 맞춤형 미술교육 시스템',
    'home.services.psychology.title': '그림심리검사 & 성향 분석',
    'home.services.psychology.desc': '그림을 통한 심리 상태 및 성향 분석',
    'home.services.metadata.title': '그림-심리 메타데이터 추출',
    'home.services.metadata.desc': '그림에서 심리 메타데이터를 추출하는 기술',
    
    // Home - 7 Core Values Section
    'home.values.section.title': '7대 가치',
    'home.values.1.title': '창의력∙상상력 극대화',
    'home.values.1.desc': '창의성을 발휘할 수 있는 디지털 종합예술 플랫폼',
    'home.values.5.title': '그림-심리 빅데이터',
    'home.values.5.desc': '그림 빅데이터를 기반으로 한 정확한 분석과 피드백',
    'home.values.6.title': '마음 건강∙정서 케어',
    'home.values.6.desc': '사회정서교육 기반의 심리 케어 및 심리적 위기 조기 발견∙회복력 강화',
    'home.values.newlang.title': '새로운 언어: 드로잉 스킬',
    'home.values.newlang.desc': '디지털 드로잉 툴로 즐겁게 자신의 감정∙생각을 표현하는 힘',
    'home.values.2.title': '글로벌 소통',
    'home.values.2.desc': '그림을 매개로 문화 교육 및 소통, 세계시민의식 함양',
    'home.values.3.title': '글로벌 인재 발굴',
    'home.values.3.desc': '세계 곳곳의 재능 발현 및 글로벌 아티스트의 탄생',
    'home.values.7.title': '숨은 재능∙적성 파악',
    'home.values.7.desc': '작품∙데이터 학습으로 숨은 재능, 적성, 진로 탐색',
    
    // Home - Our Solutions Section
    'home.solution.section.title': '우리의 솔루션',
    'home.solution.creative.title': '창작 플랫폼',
    'home.solution.creative.desc': '수채화, 유화 등 전문가 수준의 디지털 드로잉 툴이 제공되는 창작 플랫폼',
    'home.solution.gallery.title': '글로벌 디지털 갤러리',
    'home.solution.gallery.desc': '그림 전시 및 교류, 세계시민의식 함양이 가능한 소통 플랫폼',
    'home.solution.ai.title': 'AI 기술',
    'home.solution.ai.desc': '그림 빅데이터 기반의 정확한 분석과 피드백 제공',
    'home.solution.care.title': '마음 건강∙정서 케어',
    'home.solution.care.desc': '사회정서교육 기반의 심리 케어 및 성장 모니터링 서비스',
    
    // Home - Solution Details Section
    'home.detail.drawing.title': '디지털 드로잉 툴',
    'home.detail.drawing.desc': '전세계 아이들 누구나 즐겁고 행복하게 그림을 그릴 수 있는 드로잉 툴',
    'home.detail.drawing.feature1': '수채화 드로잉 툴',
    'home.detail.drawing.feature2': '유화 드로잉 툴',
    'home.detail.gallery.title': '글로벌 디지털 갤러리',
    'home.detail.gallery.desc': '그림 기반 SNS에서 글로벌 소통 & 교류',
    'home.detail.gallery.feature1': '글로벌 작품 전시',
    'home.detail.gallery.feature2': '저장 & 공유 피드',
    'home.detail.gallery.feature3': '전세계 어린이 소통 & 교류 커뮤니티',
    'home.detail.event.title': '이벤트를 통한 인재 발굴∙스토리텔링',
    'home.detail.event.desc': '누구나 참여할 수 있는 글로벌 이벤트 개최',
    'home.detail.event.feature1': '스토리가 담긴 그림 & 작품 설명 공유',
    'home.detail.event.feature2': '글로벌 시상 및 새로운 아티스트 탄생',
    'home.detail.ai.title': 'AI 기술',
    'home.detail.ai.desc': '그림 빅데이터 기반의 정확한 분석과 피드백 제공',
    'home.detail.ai.feature1': '드로잉 스킬을 배우는 AI 튜터',
    'home.detail.care.title': '마음 건강∙정서 케어',
    'home.detail.care.desc': '그림으로 마음을 점검하고, 그림 활동을 통한 처방으로 케어',
    'home.detail.care.feature1': 'AI 마음 체크업: 마음을 점검하고 위기 발견',
    'home.detail.care.feature2': 'AI 마음 테라피: 그림 활동을 통한 마음 챙김',
    'home.detail.care.feature3': '마음 비타민 봉봉: 매일 스스로 하는 그림 치유 활동',
    
    // Home - Impact Section
    'home.impact.section.title': '숫자로 보는 아트봉봉 임팩트',
    'home.impact.drawings.label': '누적 그림 데이터',
    'home.impact.drawings.sub': '출시 10개월만의 성과',
    'home.impact.patents.label': '글로벌 특허 보유',
    'home.impact.patents.sub': '국내 70건 & 해외 23건',
    
    // Home - History Section
    'home.history.title': '연혁',
    
    // Home - Products (for section display)
    'home.products.title': '제품 포트폴리오',
    'home.products.visit': '자세히 보기',
    
    // Product 1: Art Bon Bon (B2C)
    'home.products.b2c.name': '아트봉봉',
    'home.products.b2c.subtitle': '아이들 창의력을 극대화하는 디지털 드로잉 툴',
    'home.products.b2c.desc': '340여개 클래스 중 아이의 관심과 흥미에 따라 자유롭게 선택하세요. 시간·장소의 제약 없이, 준비물과 뒷정리 없이 1:1 실시간 인터랙티브 클래스로 집에서 창의성을 키울 수 있습니다.',
    'home.products.b2c.who': '가정의 아이들과 학부모',
    'home.products.b2c.when': '가정 학습 및 여가 시간',
    
    // Product 2: Art Bon Bon School
    'home.products.school.name': '아트봉봉스쿨',
    'home.products.school.subtitle': '교육기관을 위한 AI 기반 미술교육 솔루션',
    'home.products.school.desc': '수업 준비부터 학습 관리까지 교사의 업무 부담을 줄이고, 학생별 진도와 창작 결과를 한눈에 관리할 수 있습니다. 정규 수업·방과 후·특기적성 등 다양한 교육 환경에 즉시 적용 가능합니다.',
    'home.products.school.who': '교사 및 교육기관',
    'home.products.school.when': '수업 시간 및 방과 후 활동',
    
    // Product 3: Art Bon Bon École
    'home.products.ecole.name': '아트봉봉 에꼴',
    'home.products.ecole.subtitle': '글로벌 교육 파트너를 위한 다국어 아트 플랫폼',
    'home.products.ecole.desc': '영어·프랑스어·스페인어 등 다국어를 지원하며, 지역별 교육 과정에 맞춰 커스터마이징할 수 있습니다. 해외 학교·학원·교육 기관과의 파트너십을 통해 전 세계 아이들에게 창의적 미술 경험을 제공합니다.',
    'home.products.ecole.who': '글로벌 교육 파트너',
    'home.products.ecole.when': '다국어 교육 환경',
    
    // Home - Resources Preview
    'home.resources.title': '리소스',
    'home.resources.guides': '교사 가이드',
    'home.resources.guides.desc': '교사를 위한 실용 가이드',
    'home.resources.usecases': '활용 사례',
    'home.resources.usecases.desc': '현장의 성공 스토리',
    'home.resources.sel': '아트 & SEL',
    'home.resources.sel.desc': '사회정서학습과 미술',
    'home.resources.trends': '글로벌 트렌드',
    'home.resources.trends.desc': '글로벌 아트교육 동향',
    
    // Home - Newsroom
    'home.newsroom.title': '뉴스룸',
    'home.newsroom.view_all': '모든 뉴스 보기',
    
    // About Page
    'about.title': '회사 소개',
    
    // About - Founder's Note (Block 1)
    'about.founder.title': '창업자 인사말',
    'about.founder.greeting': '안녕하세요, 아이스크림아트입니다.',
    'about.founder.quote': '모든 아이들이 예술을 통해 자신을 표현하고, 창의적 자신감을 기를 수 있어야 합니다.',
    'about.founder.note': '우리는 모든 아이들이 예술을 통해 자신을 표현하고, 감정을 탐색하며, 창의적 자신감을 기를 수 있어야 한다고 믿습니다. 아트봉봉은 전세계 어린이들이 즐겁고 행복하게 그림을 그리며 자신의 이야기를 전할 수 있는 플랫폼입니다.',
    'about.founder.name': 'i-Scream arts 창립자',
    'about.founder.role': 'Founder & CEO',
    'about.founder.photo.placeholder': '창립자 사진',
    
    // About - Mission & Philosophy (Block 2)
    'about.mission.title': '미션 · 철학',
    'about.mission.statement': '드로잉 스킬은 미래 경쟁력입니다',
    'about.mission.desc': '디지털 시대에 자신의 생각과 감정을 시각적으로 표현하는 능력은 단순한 취미를 넘어 핵심 역량이 됩니다. 우리는 모든 아이들이 이 능력을 개발할 수 있도록 돕습니다.',
    'about.mission.vision': '예술의 표현력, 교육의 체계성, 기술의 접근성을 결합하여 새로운 학습 경험을 만들어갑니다.',
    'about.mission.center': '드로잉 스킬',
    'about.mission.pillar1': '예술의 표현력',
    'about.mission.pillar2': '교육의 체계',
    'about.mission.pillar3': '기술의 접근성',
    
    // About - Technology & Patents (Block 3)
    'about.tech.title': '기술력 & 특허',
    'about.tech.patents': '글로벌 특허 100여개 보유',
    'about.tech.domestic': '국내 70건',
    'about.tech.overseas': '해외 23건',
    'about.tech.papers': '국외 논문 게재',
    'about.tech.areas': '드로잉 툴 / AI 기술 및 솔루션 / 그림심리검사 & 성향 분석',
    
    // About - 7 Core Values (Block 4) - matching home order
    'about.values.title': '7가지 핵심가치',
    'about.values.subtitle': '아트봉봉이 추구하는 핵심 가치와 철학입니다.',
    'about.values.1.detail': '디지털 드로잉 툴을 통해 자신의 감정과 생각을 자유롭게 표현하는 새로운 소통 능력을 길러줍니다.',
    'about.values.2.detail': '그림이라는 보편적 언어를 매개로 문화 교류와 세계시민의식을 함양합니다.',
    'about.values.3.detail': '전세계 곳곳에서 재능있는 아이들을 발굴하고, 글로벌 아티스트로 성장할 수 있는 기회를 제공합니다.',
    'about.values.4.detail': '디지털 종합예술 플랫폼에서 창의성과 상상력을 최대한 발휘할 수 있는 환경을 제공합니다.',
    'about.values.5.detail': '축적된 그림-심리 빅데이터를 기반으로 정확하고 의미있는 분석과 피드백을 제공합니다.',
    'about.values.6.detail': '사회정서교육(SEL) 기반의 심리 케어로 정서적 위기를 조기에 발견하고 회복력을 강화합니다.',
    'about.values.7.detail': '아이들의 작품과 활동 데이터를 학습하여 숨겨진 재능과 적성을 발견하고, 미래 진로 탐색을 돕습니다.',
    
    // About - Core Services Map (Block 4) - matching deck categories
    'about.services.title': '핵심 서비스 맵',
    'about.services.subtitle': '우리가 제공하는 핵심 서비스와 솔루션입니다.',
    'about.services.drawing.detail': '수채화, 유화, 수묵화 등 다양한 디지털 드로잉 툴로 전세계 누구나 즐겁게 그림을 그릴 수 있습니다.',
    'about.services.class.detail': '참여형 미술 수업과 창작 활동을 통해 아이들의 창의성을 키웁니다.',
    'about.services.ai.detail': 'AI 마음 체크업으로 스트레스를 점검하고, AI 마음 테라피로 그림 활동을 통한 마음 챙김을 지원합니다.',
    'about.services.education.detail': 'AI 기반 맞춤형 미술교육 시스템으로 개인별 학습 경험을 제공합니다.',
    'about.services.psychology.detail': '그림을 통해 심리 상태와 성향을 분석하여 의미있는 피드백을 제공합니다.',
    'about.services.metadata.detail': '그림에서 심리 메타데이터를 추출하여 정서적 상태를 파악합니다.',
    
    // About - Timeline (Block 5)
    'about.timeline.title': '주요 연혁',
    'about.timeline.2024.singapore': '2024 에듀테크 아시아 싱가포르 전시',
    'about.timeline.2024.tokyo': '2024 Tokyo Edix 일본 전시',
    'about.timeline.2023.bologna': '2023 이탈리아 볼로냐 국제 아동 도서전 참가',
    'about.timeline.patents': '글로벌 특허 100여개 보유 (국내 70건, 해외 23건)',
    'about.timeline.papers': '국외 논문 게재',
    'about.timeline.expand': '전체 연혁 보기',
    'about.timeline.showall': '모든 마일스톤 보기',
    'about.timeline.showless': '간략히 보기',
    
    // About Legacy
    'about.why.title': '우리가 존재하는 이유',
    'about.why.desc': '모든 아이들이 예술을 통해 자신을 표현하고, 감정을 탐색하며, 창의적 자신감을 기를 수 있어야 한다고 믿습니다.',
    'about.perspective.title': 'Art × Education × Technology',
    'about.perspective.desc': '예술의 표현력, 교육의 체계성, 기술의 접근성을 결합하여 새로운 학습 경험을 만들어갑니다.',
    'about.direction.title': '장기 방향',
    'about.direction.desc': '전 세계 교육 현장에서 창의적 학습의 표준이 되는 것을 목표로 합니다.',
    
    // Products Page
    'products.title': '제품',
    'products.subtitle': '어린이 행복 네트워크를 만드는 아트 솔루션',
    'products.viewdetails': '자세히 보기',
    'products.comingsoon': '준비 중',
    
    // Product 1: ART BONBON
    'products.artbonbon.name': '아트봉봉',
    'products.artbonbon.desc': '아이들 창의력을 극대화하는 디지털 드로잉 툴',
    
    // Product 2: ART BONBON SCHOOL
    'products.school.name': '아트봉봉 스쿨',
    'products.school.desc': '교육기관을 위한 AI 기반 미술교육 솔루션',
    
    // Product 3: Gallery
    'products.gallery.name': '갤러리',
    'products.gallery.desc': '글로벌 소통을 위한 아트 플랫폼',
    
    // Resources Page
    'resources.title': '리소스',
    'resources.subtitle': '교육자와 학습자를 위한 자료',
    'resources.readmore': '자세히 보기',
    'resources.featured.title': '인기 리소스',
    'resources.featured.card1.badge': '교사 가이드',
    'resources.featured.card1.title': '아트봉봉스쿨 시작 가이드',
    'resources.featured.card1.desc': '아트봉봉스쿨을 처음 사용하는 교사를 위한 종합 가이드',
    'resources.featured.card2.badge': '활용 사례',
    'resources.featured.card2.title': '서울 초등학교 성공 사례',
    'resources.featured.card2.desc': '2,000명의 학생들이 창의성을 향상시킨 이야기',
    'resources.featured.card3.badge': '아트 & SEL',
    'resources.featured.card3.title': '정서적 웰빙을 위한 그림 그리기',
    'resources.featured.card3.desc': '예술과 정신 건강에 대한 연구 기반 인사이트',
    
    // Newsroom Page
    'newsroom.title': '뉴스룸',
    'newsroom.subtitle': '최신 소식과 업데이트',
    'newsroom.press': '보도자료',
    'newsroom.events': '이벤트',
    'newsroom.awards': '수상',
    'newsroom.partnerships': '파트너십',
    
    // Contact Page
    'contact.title': '문의하기',
    'contact.subtitle': '어떤 문의든 환영합니다',
    
    // Contact Tabs (English only)
    'contact.tab.partnership': '제휴 문의',
    'contact.tab.artbonbon': 'ART BONBON 문의',
    'contact.tab.school': 'ART BONBON SCHOOL 문의',
    
    // HappyTalk (Korean only)
    'contact.happytalk.title': '문의하기',
    'contact.happytalk.desc': '해피톡을 통해 빠르게 문의하세요.',
    'contact.happytalk.button': '문의하기',
    
    // Location Section
    'contact.location.title': '찾아오시는 길',
    'contact.location.address.label': '주소',
    'contact.location.address': '경기도 성남시 분당구 대왕판교로 660, B1F 패스트파이브 121호 (유스페이스1) (주)아이스크림아트',
    'contact.location.phone.label': '전화번호',
    'contact.location.email.label': '이메일',
    
    // Contact Form
    'contact.form.title': '문의하기',
    'contact.form.select': '선택해 주세요',
    'contact.form.submit': '문의 보내기',
    'contact.form.organization': '기관/회사명',
    'contact.form.organization.placeholder': '기관 또는 회사명을 입력하세요',
    'contact.form.contactperson': '담당자명',
    'contact.form.contactperson.placeholder': '담당자 이름을 입력하세요',
    'contact.form.email': '이메일',
    'contact.form.email.placeholder': 'example@email.com',
    'contact.form.phone': '전화번호',
    'contact.form.phone.placeholder': '+82 10-0000-0000',
    'contact.form.country': '국가',
    'contact.form.country.placeholder': '국가를 입력하세요',
    'contact.form.partnershiptype': '파트너십 유형',
    'contact.form.partnership.school': '학교',
    'contact.form.partnership.district': '교육청',
    'contact.form.partnership.enterprise': '기업',
    'contact.form.partnership.other': '기타',
    'contact.form.name': '이름',
    'contact.form.name.placeholder': '이름을 입력하세요',
    'contact.form.product': '제품 선택',
    'contact.form.usertype': '사용자 유형',
    'contact.form.usertype.parent': '학부모',
    'contact.form.usertype.teacher': '교사',
    'contact.form.usertype.student': '학생',
    'contact.form.usertype.admin': '관리자',
    'contact.form.mediaoutlet': '매체명',
    'contact.form.mediaoutlet.placeholder': '매체명을 입력하세요',
    'contact.form.reportername': '기자명',
    'contact.form.reportername.placeholder': '기자 이름을 입력하세요',
    'contact.form.inquirytype': '문의 유형',
    'contact.form.media.press': '보도자료 요청',
    'contact.form.media.interview': '인터뷰 요청',
    'contact.form.media.demo': '제품 데모',
    'contact.form.subject': '제목',
    'contact.form.subject.placeholder': '문의 제목을 입력하세요',
    'contact.form.message': '메시지',
    'contact.form.message.placeholder': '문의 내용을 입력하세요',
    
    
    // Footer
    'footer.company': '회사',
    'footer.products': '제품',
    'footer.careers': '인재 채용',
    'footer.resources': '리소스',
    'footer.legal': '법적 고지',
    'footer.privacy': '개인정보처리방침',
    'footer.terms': '이용약관',
    'footer.copyright': '© 2024 아이스크림아트. All rights reserved.',
  },
  en: {
    // Brand
    'brand.name': 'i-Scream arts',
    'brand.tagline': 'Art × Education × Technology',
    
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.products': 'Products',
    'nav.blog': 'Blog',
    'nav.news': 'News',
    'nav.contact': 'Contact',
    
    // CTAs (Corporate-appropriate only)
    'cta.explore_products': 'Explore Products',
    'cta.read_blog': 'Read Blog',
    'cta.contact': 'Contact',
    'cta.partnership': 'Partnership Inquiry',
    'cta.learn_more': 'Learn More',
    
    // Home - Hero (visible copy)
    'home.headline': 'Global Happiness Network for Children',
    'home.slogan': "Children's happiness starts with ART BONBON.",
    'home.micro': 'i-Scream arts is a digital art-based global EdTech company creating drawing skills, global gallery, and emotional care experiences through ART BONBON.',
    
    // Home - What We Do
    'home.whatwedo.title': 'What We Do',
    'home.whatwedo.subtitle': "Children's happiness starts with ART BONBON",
    'home.whatwedo.talent.title': 'Hidden Talent Discovery',
    'home.whatwedo.talent.desc': 'Discover hidden talents, aptitudes, and career paths through artwork data analysis',
    'home.whatwedo.global.title': 'Global Talent Network',
    'home.whatwedo.global.desc': 'Discover talents worldwide and provide opportunities to grow as global artists',
    'home.whatwedo.care.title': 'Mental Health & Emotional Care',
    'home.whatwedo.care.desc': 'SEL-based psychological care for early crisis detection and resilience building',
    
    // (Solution keys moved to new sections)
    
    // Home - 7 Core Values Section
    'home.values.section.title': '7 Core Values',
    'home.values.1.title': 'Boosting Creativity & Imagination',
    'home.values.1.desc': 'Comprehensive digital art platform that maximizes creative potential',
    'home.values.5.title': 'Art-Psychology Big Data Analytics',
    'home.values.5.desc': 'Accurate analysis and feedback based on drawing big data',
    'home.values.6.title': 'Mental Health & Emotional Care',
    'home.values.6.desc': 'SEL-based psychological care, early crisis detection, and resilience building',
    'home.values.newlang.title': 'New Language: Drawing Skills',
    'home.values.newlang.desc': 'The power to joyfully express emotions and thoughts through digital drawing tools',
    'home.values.2.title': 'Global Communication',
    'home.values.2.desc': 'Cultural education and communication through art, fostering global citizenship',
    'home.values.3.title': 'Discovery of Global Talent',
    'home.values.3.desc': 'Discovering talent worldwide and nurturing global artists',
    'home.values.7.title': 'Identification of Hidden Talents & Aptitudes',
    'home.values.7.desc': 'Discovering hidden talents, aptitudes, and career paths through artwork and data',
    
    // Home - Our Solutions Section
    'home.solution.section.title': 'Our Solutions',
    'home.solution.creative.title': 'Creative Platform',
    'home.solution.creative.desc': 'Creative platform providing professional-level digital drawing tools including watercolor and oil painting',
    'home.solution.gallery.title': 'Global Digital Gallery',
    'home.solution.gallery.desc': 'Communication platform for art exhibition, exchange, and fostering global citizenship',
    'home.solution.ai.title': 'AI Technology',
    'home.solution.ai.desc': 'Accurate analysis and feedback based on drawing big data',
    'home.solution.care.title': 'Mental Health & Emotional Care',
    'home.solution.care.desc': 'Digital art based mental well-being program',
    
    // Home - Solution Details Section
    'home.detail.drawing.title': 'Digital Drawing Tools',
    'home.detail.drawing.desc': 'Drawing tools where children around the world can draw happily and joyfully',
    'home.detail.drawing.feature1': 'Watercolor Drawing Tool',
    'home.detail.drawing.feature2': 'Oil Painting Drawing Tool',
    'home.detail.gallery.title': 'Global Digital Gallery',
    'home.detail.gallery.desc': 'Global communication & exchange on art-based SNS',
    'home.detail.gallery.feature1': 'Global Artwork Exhibition',
    'home.detail.gallery.feature2': 'Save & Share Feed',
    'home.detail.gallery.feature3': 'Worldwide Children Communication & Exchange Community',
    'home.detail.event.title': 'Talent Discovery & Storytelling through Events',
    'home.detail.event.desc': 'Global events that anyone can participate in',
    'home.detail.event.feature1': 'Share story-filled artworks & descriptions',
    'home.detail.event.feature2': 'Global awards and birth of new artists',
    'home.detail.ai.title': 'AI Technology',
    'home.detail.ai.desc': 'Accurate analysis and feedback based on drawing big data',
    'home.detail.ai.feature1': 'AI Tutor for learning drawing skills',
    'home.detail.care.title': 'Mental Health & Emotional Care',
    'home.detail.care.desc': 'Check your mind through drawings, care through art activities',
    'home.detail.care.feature1': 'AI Mind Checkup: Check your mind and detect crises',
    'home.detail.care.feature2': 'AI Mind Therapy: Mindfulness through art activities',
    'home.detail.care.feature3': 'Mind Vitamin BONBON: Daily self-healing art activities',
    
    // Home - Impact Section
    'home.impact.section.title': 'ART BONBON Impact by Numbers',
    'home.impact.drawings.label': 'Cumulative Drawing Data',
    'home.impact.drawings.sub': 'Achievement in just 10 months since launch',
    'home.impact.patents.label': 'Global Patents',
    'home.impact.patents.sub': '70 domestic & 23 overseas',
    
    // Home - History Section
    'home.history.title': 'Company History',
    
    // Home - Contact
    'home.contact.title': "Let's Build Together",
    'home.contact.desc': 'Reach out for partnerships, collaborations, or inquiries.',
    
    // Home - Products
    'home.products.title': 'Product Portfolio',
    'home.products.visit': 'Visit Website',
    
    // Product 1: Art Bon Bon (B2C)
    'home.products.b2c.name': 'ART BONBON',
    'home.products.b2c.subtitle': 'Digital drawing tool that maximizes children\'s creativity',
    'home.products.b2c.desc': 'Choose freely from over 340 classes based on your child\'s interests. Build creativity at home with 1:1 real-time interactive classes—no time or location limits, no supplies or cleanup needed.',
    'home.products.b2c.who': 'Children & Parents at Home',
    'home.products.b2c.when': 'Home Learning & Leisure Time',
    
    // Product 2: Art Bon Bon School
    'home.products.school.name': 'ART BONBON SCHOOL',
    'home.products.school.subtitle': 'AI-powered art education solution for educational institutions',
    'home.products.school.desc': 'From lesson prep to learning management, reduce teacher workload while tracking each student\'s progress and creative outputs at a glance. Ready for regular classes, after-school programs, and extracurricular activities.',
    'home.products.school.who': 'Teachers & Educational Institutions',
    'home.products.school.when': 'Classroom & After-school Activities',
    
    // Product 3: Art Bon Bon École
    'home.products.ecole.name': 'ART BONBON ÉCOLE',
    'home.products.ecole.subtitle': 'Multilingual art platform for global education partners',
    'home.products.ecole.desc': 'Supports English, French, Spanish, and more—customizable to regional curricula. Through partnerships with schools and educational institutions worldwide, we bring creative art experiences to children everywhere.',
    'home.products.ecole.who': 'Global Education Partners',
    'home.products.ecole.when': 'Multilingual Education Environments',
    
    // Home - Resources Preview
    'home.resources.title': 'Resources',
    'home.resources.guides': 'Teacher Guides',
    'home.resources.guides.desc': 'Practical guides for teachers',
    'home.resources.usecases': 'Use Cases',
    'home.resources.usecases.desc': 'Success stories from the field',
    'home.resources.sel': 'Art & SEL',
    'home.resources.sel.desc': 'Social-emotional learning and art',
    'home.resources.trends': 'Global Trends',
    'home.resources.trends.desc': 'Global art education trends',
    
    // Home - Newsroom
    'home.newsroom.title': 'Newsroom',
    'home.newsroom.view_all': 'View All News',
    
    // About Page
    'about.title': 'About Us',
    
    // About - Founder's Note (Block 1)
    'about.founder.title': "Founder's Note",
    'about.founder.greeting': 'Hello, we are i-Scream arts.',
    'about.founder.quote': 'Every child should be able to express themselves through art and develop creative confidence.',
    'about.founder.note': 'We believe every child should be able to express themselves through art, explore their emotions, and develop creative confidence. ART BONBON is a platform where children around the world can joyfully draw and share their stories.',
    'about.founder.name': 'i-Scream arts Founder',
    'about.founder.role': 'Founder & CEO',
    'about.founder.photo.placeholder': 'Founder Photo',
    
    // About - Mission & Philosophy (Block 2)
    'about.mission.title': 'Mission & Philosophy',
    'about.mission.statement': 'Drawing skills are a future competency',
    'about.mission.desc': "In the digital age, the ability to visually express one's thoughts and emotions goes beyond a hobby—it becomes a core competency. We help every child develop this ability.",
    'about.mission.vision': 'We combine the expressiveness of art, the structure of education, and the accessibility of technology to create new learning experiences.',
    'about.mission.center': 'Drawing Skills',
    'about.mission.pillar1': 'Expression of Art',
    'about.mission.pillar2': 'Structure of Education',
    'about.mission.pillar3': 'Accessibility of Tech',
    
    // About - Technology & Patents (Block 3)
    'about.tech.title': 'Technology & Patents',
    'about.tech.patents': '100+ Global Patents',
    'about.tech.domestic': '70 domestic',
    'about.tech.overseas': '23 overseas',
    'about.tech.papers': 'International Publications',
    'about.tech.areas': 'Drawing Tools / AI Technology & Solutions / Drawing Psychology & Trait Analysis',
    
    // About - 7 Core Values (Block 4) - matching home order
    'about.values.title': '7 Core Values',
    'about.values.subtitle': 'The core values and philosophy that ART BONBON pursues.',
    'about.values.1.detail': 'Through digital drawing tools, we nurture the ability to freely express emotions and thoughts.',
    'about.values.2.detail': 'Using art as a universal language, we foster cultural exchange and global citizenship.',
    'about.values.3.detail': 'We discover talented children worldwide and provide opportunities for them to grow into global artists.',
    'about.values.4.detail': 'We provide an environment where creativity and imagination can be fully expressed on a comprehensive digital art platform.',
    'about.values.5.detail': 'Based on accumulated drawing-psychology big data, we provide accurate and meaningful analysis and feedback.',
    'about.values.6.detail': 'Through SEL-based psychological care, we detect emotional crises early and strengthen resilience.',
    'about.values.7.detail': "We analyze children's artwork and activity data to discover hidden talents and aptitudes, helping them explore future career paths.",
    
    // About - Core Services Map (Block 4) - matching deck categories
    'about.services.title': 'Core Services Map',
    'about.services.subtitle': 'Our core services and solutions for creative learning.',
    'about.services.drawing.detail': 'Digital drawing tools including watercolor, oil painting, and ink wash let anyone anywhere enjoy creating art.',
    'about.services.class.detail': 'Participatory art classes and creative activities that nurture creativity.',
    'about.services.ai.detail': 'AI Mind Checkup monitors stress levels, while AI Mind Therapy supports mindfulness through drawing activities.',
    'about.services.education.detail': 'AI-based personalized art education system providing individual learning experiences.',
    'about.services.psychology.detail': 'Analyze psychological state and traits through drawings to provide meaningful feedback.',
    'about.services.metadata.detail': 'Extract psychological metadata from drawings to understand emotional states.',
    
    // About - Timeline (Block 5)
    'about.timeline.title': 'Key Milestones',
    'about.timeline.2024.singapore': '2024 Edutech Asia Singapore Exhibition',
    'about.timeline.2024.tokyo': '2024 Tokyo Edix Japan Exhibition',
    'about.timeline.2023.bologna': "2023 Bologna International Children's Book Fair",
    'about.timeline.patents': '100+ global patents (70 domestic, 23 overseas)',
    'about.timeline.papers': 'International publications',
    'about.timeline.expand': 'View Full Timeline',
    'about.timeline.showall': 'Show All Milestones',
    'about.timeline.showless': 'Show Less',
    
    // About Legacy
    'about.why.title': 'Why We Exist',
    'about.why.desc': 'We believe every child should be able to express themselves through art, explore their emotions, and develop creative confidence.',
    'about.perspective.title': 'Art × Education × Technology',
    'about.perspective.desc': 'We combine the expressiveness of art, the structure of education, and the accessibility of technology to create new learning experiences.',
    'about.direction.title': 'Long-term Direction',
    'about.direction.desc': 'Our goal is to become the standard for creative learning in educational settings worldwide.',
    
    // Products Page
    'products.title': 'Products',
    'products.subtitle': 'Art solutions creating a global happiness network for children',
    'products.viewdetails': 'View Details',
    'products.comingsoon': 'Coming Soon',
    
    // Product 1: ART BONBON
    'products.artbonbon.name': 'ART BONBON',
    'products.artbonbon.desc': 'Digital drawing tool that maximizes children\'s creativity',
    
    // Product 2: ART BONBON SCHOOL
    'products.school.name': 'ART BONBON SCHOOL',
    'products.school.desc': 'AI-powered art education solution for educational institutions',
    
    // Product 3: Gallery
    'products.gallery.name': 'Gallery',
    'products.gallery.desc': 'Art platform for global communication',
    
    // Resources Page
    'resources.title': 'Resources',
    'resources.subtitle': 'Materials for educators and learners',
    'resources.readmore': 'Read More',
    'resources.featured.title': 'Featured Resources',
    'resources.featured.card1.badge': 'Teacher Guides',
    'resources.featured.card1.title': 'Getting Started with ART BONBON SCHOOL',
    'resources.featured.card1.desc': 'A comprehensive guide for teachers new to ART BONBON SCHOOL',
    'resources.featured.card2.badge': 'Use Cases',
    'resources.featured.card2.title': 'Seoul Elementary School Success Story',
    'resources.featured.card2.desc': 'How 2,000 students improved their creativity',
    'resources.featured.card3.badge': 'Art & SEL',
    'resources.featured.card3.title': 'Drawing for Emotional Wellbeing',
    'resources.featured.card3.desc': 'Research-based insights on art and mental health',
    
    // Newsroom Page
    'newsroom.title': 'Newsroom',
    'newsroom.subtitle': 'Latest news and updates',
    'newsroom.press': 'Press Releases',
    'newsroom.events': 'Events',
    'newsroom.awards': 'Awards',
    'newsroom.partnerships': 'Partnerships',
    
    // Contact Page
    'contact.title': 'Contact',
    'contact.subtitle': 'We welcome all inquiries',
    
    // Contact Tabs
    'contact.tab.partnership': 'Partnership Inquiry',
    'contact.tab.artbonbon': 'ART BONBON Inquiry',
    'contact.tab.school': 'ART BONBON SCHOOL Inquiry',
    
    // HappyTalk (Korean only - not used in EN but included for consistency)
    'contact.happytalk.title': 'Contact Us',
    'contact.happytalk.desc': 'Contact us quickly through HappyTalk.',
    'contact.happytalk.button': 'Contact Us',
    
    // Location Section
    'contact.location.title': 'How to Find Us',
    'contact.location.address.label': 'Address',
    'contact.location.address': 'B1F Room 121, FastFive, 660 Daewang Pangyo-ro, Bundang-gu, Seongnam-si, Gyeonggi-do (U-Space 1), i-Scream arts Co., Ltd.',
    'contact.location.phone.label': 'Phone',
    'contact.location.email.label': 'Email',
    
    // Contact Form
    'contact.form.title': 'Send us a message',
    'contact.form.select': 'Please select',
    'contact.form.submit': 'Submit Inquiry',
    'contact.form.organization': 'Organization/Company Name',
    'contact.form.organization.placeholder': 'Enter your organization name',
    'contact.form.contactperson': 'Contact Person Name',
    'contact.form.contactperson.placeholder': 'Enter contact person name',
    'contact.form.email': 'Email',
    'contact.form.email.placeholder': 'example@email.com',
    'contact.form.phone': 'Phone Number',
    'contact.form.phone.placeholder': '+1 000-000-0000',
    'contact.form.country': 'Country',
    'contact.form.country.placeholder': 'Enter your country',
    'contact.form.partnershiptype': 'Partnership Type',
    'contact.form.partnership.school': 'School',
    'contact.form.partnership.district': 'Education Office',
    'contact.form.partnership.enterprise': 'Enterprise',
    'contact.form.partnership.other': 'Other',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'Enter your name',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'Enter inquiry subject',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Enter your message',
    
    
    // Footer
    'footer.company': 'Company',
    'footer.products': 'Products',
    'footer.careers': 'Careers',
    'footer.resources': 'Resources',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.copyright': '© 2024 i-Scream arts. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('icecreamart-lang');
      if (saved === 'ko' || saved === 'en') return saved;
      
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ko')) return 'ko';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('icecreamart-lang', language);
    document.documentElement.lang = language;
    document.body.setAttribute('data-lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
