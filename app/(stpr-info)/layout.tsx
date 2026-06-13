import { M_PLUS_Rounded_1c, Noto_Sans_JP } from "next/font/google"
import InfoHeader from "@/components/info/InfoHeader"

const rounded = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--si-rounded",
  display: "swap",
})
const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--si-sans",
  display: "swap",
})

export default function StprInfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${rounded.variable} ${notoSans.variable} stpr-info`}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <InfoHeader />
      {children}
    </div>
  )
}

/* モックアップ（STPR NEWS & SCHEDULE）の CSS を .stpr-info 配下にスコープして移植。
   絵文字は UI に使わない方針（設計書）。 */
const CSS = `
.stpr-info{
  --accent:#005397; --accent-light:#e6eef5; --accent-mid:#2e75b2;
  --pink:#f06292; --pink-light:#fce4ec;
  --text:#1a1a2e; --text-sub:#666; --border:#e8eef5; --bg:#f5f8fc; --white:#fff; --radius:12px;
  font-family:var(--si-rounded),var(--si-sans),sans-serif;
  color:var(--text); background:var(--bg); min-height:100vh;
}
.stpr-info *{box-sizing:border-box;}

/* ===== TAB SWITCHER（ヘッダー） ===== */
.stpr-info .page-switcher{position:fixed;top:0;left:0;right:0;z-index:200;background:var(--white);border-bottom:2px solid var(--accent);display:flex;align-items:center;padding:0 24px;height:56px;}
.stpr-info .site-logo{font-weight:900;font-size:18px;color:var(--accent);letter-spacing:.05em;margin-right:32px;text-decoration:none;}
.stpr-info .page-tab{padding:0 20px;height:56px;display:flex;align-items:center;font-size:14px;font-weight:700;color:var(--text-sub);cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;background:none;border-top:none;border-left:none;border-right:none;text-decoration:none;}
.stpr-info .page-tab:hover{color:var(--accent);}
.stpr-info .page-tab.active{color:var(--accent);border-bottom-color:var(--accent);}

/* ===== ページコンテナ ===== */
.stpr-info .page{padding-top:56px;min-height:100vh;}

/* ===== NEWS ===== */
.stpr-info .news-layout{display:grid;grid-template-columns:260px 1fr;max-width:1400px;margin:0 auto;align-items:start;}
.stpr-info .news-sidebar,.stpr-info .schedule-sidebar{position:sticky;top:56px;height:calc(100vh - 56px);overflow-y:auto;background:var(--white);border-right:1px solid var(--border);display:flex;flex-direction:column;}
.stpr-info .news-sidebar{padding:24px 16px;gap:24px;}
.stpr-info .sidebar-title{font-size:11px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--text-sub);margin-bottom:10px;}
.stpr-info .sokuhoh-list{display:flex;flex-direction:column;gap:8px;}
.stpr-info .sokuhoh-item{display:flex;align-items:center;gap:8px;padding:10px 12px;background:#fff3f0;border:1px solid #ffcdd2;border-radius:8px;cursor:pointer;transition:background .2s;text-align:left;}
.stpr-info .sokuhoh-item:hover{background:#ffe0dc;}
.stpr-info .sokuhoh-badge{background:#e53935;color:#fff;font-size:10px;font-weight:900;padding:2px 6px;border-radius:4px;flex-shrink:0;letter-spacing:.05em;}
.stpr-info .sokuhoh-text{font-size:12px;font-weight:700;line-height:1.4;color:var(--text);}
.stpr-info .group-filter{display:flex;flex-direction:column;gap:4px;}
.stpr-info .filter-item{display:flex;align-items:center;gap:10px;padding:8px 12px;border-radius:8px;cursor:pointer;transition:background .15s;font-size:13px;font-weight:700;color:var(--text);background:none;border:none;text-align:left;width:100%;}
.stpr-info .filter-item:hover{background:var(--accent-light);}
.stpr-info .filter-item.active{background:var(--accent-light);color:var(--accent);}
.stpr-info .filter-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;}
.stpr-info .filter-count{margin-left:auto;font-size:11px;color:var(--text-sub);background:var(--bg);padding:2px 7px;border-radius:10px;}
.stpr-info .category-tags{display:flex;flex-wrap:wrap;gap:6px;}
.stpr-info .cat-tag{padding:4px 12px;border-radius:20px;font-size:11px;font-weight:700;cursor:pointer;border:1px solid var(--border);background:var(--white);color:var(--text-sub);transition:all .15s;}
.stpr-info .cat-tag:hover,.stpr-info .cat-tag.active{background:var(--accent);color:#fff;border-color:var(--accent);}

.stpr-info .news-main{padding:24px 28px;}
.stpr-info .featured-article{border-radius:var(--radius);overflow:hidden;background:var(--white);box-shadow:0 2px 12px rgba(0,83,151,.08);margin-bottom:28px;cursor:pointer;transition:transform .2s,box-shadow .2s;display:grid;grid-template-columns:1fr 380px;text-align:left;border:none;width:100%;}
.stpr-info .featured-article:hover{transform:translateY(-2px);box-shadow:0 6px 24px rgba(0,83,151,.14);}
.stpr-info .featured-img{aspect-ratio:16/9;background:linear-gradient(135deg,#b8d0e5,#e6eef5);display:flex;align-items:center;justify-content:center;overflow:hidden;}
.stpr-info .featured-img img{width:100%;height:100%;object-fit:cover;}
.stpr-info .featured-body{padding:28px;display:flex;flex-direction:column;justify-content:space-between;}
.stpr-info .featured-meta{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
.stpr-info .article-cat{font-size:11px;font-weight:700;padding:3px 10px;border-radius:4px;background:var(--accent-light);color:var(--accent);}
.stpr-info .article-date{font-size:12px;color:var(--text-sub);}
.stpr-info .featured-title{font-size:22px;font-weight:900;line-height:1.4;color:var(--text);margin-bottom:12px;}
.stpr-info .featured-desc{font-size:14px;color:var(--text-sub);line-height:1.7;}
.stpr-info .featured-group{display:flex;align-items:center;gap:8px;margin-top:16px;}
.stpr-info .group-badge{font-size:12px;font-weight:700;padding:4px 12px;border-radius:20px;background:var(--pink-light);color:var(--pink);}
.stpr-info .articles-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;}
.stpr-info .articles-label{font-size:13px;font-weight:700;color:var(--text-sub);}
.stpr-info .articles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.stpr-info .article-card{background:var(--white);border-radius:var(--radius);overflow:hidden;box-shadow:0 1px 6px rgba(0,83,151,.06);cursor:pointer;transition:transform .2s,box-shadow .2s;text-align:left;border:none;width:100%;padding:0;font-family:inherit;}
.stpr-info .article-card:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,83,151,.12);}
.stpr-info .article-thumb{aspect-ratio:16/9;background:linear-gradient(135deg,#e6eef5,#b8d0e5);overflow:hidden;}
.stpr-info .article-thumb img{width:100%;height:100%;object-fit:cover;}
.stpr-info .article-thumb.pink{background:linear-gradient(135deg,#fce4ec,#f8bbd9);}
.stpr-info .article-body{padding:14px;}
.stpr-info .article-title{font-size:14px;font-weight:700;line-height:1.5;margin-bottom:6px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--text);}
.stpr-info .article-footer{display:flex;align-items:center;justify-content:space-between;margin-top:8px;}
.stpr-info .empty-note{grid-column:1/-1;padding:48px;text-align:center;color:var(--text-sub);font-size:14px;}

/* リンク化したカード（Link=<a>）のリセット */
.stpr-info .sokuhoh-item,.stpr-info .featured-article,.stpr-info .article-card{text-decoration:none;color:inherit;}
.stpr-info .article-card{display:block;}

/* ===== 記事詳細ページ ===== */
.stpr-info .news-detail{max-width:760px;margin:0 auto;padding:24px 20px 64px;}
.stpr-info .detail-back{display:inline-flex;align-items:center;gap:4px;font-size:13px;font-weight:700;color:var(--accent);text-decoration:none;margin-bottom:16px;}
.stpr-info .detail-back:hover{text-decoration:underline;}
.stpr-info .detail-hero{aspect-ratio:16/9;border-radius:var(--radius);overflow:hidden;background:linear-gradient(135deg,#b8d0e5,#e6eef5);margin-bottom:24px;}
.stpr-info .detail-hero.pink{background:linear-gradient(135deg,#fce4ec,#f8bbd9);}
.stpr-info .detail-hero img{width:100%;height:100%;object-fit:cover;}
.stpr-info .detail-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px;}
.stpr-info .detail-title{font-size:28px;font-weight:900;line-height:1.4;color:var(--text);margin-bottom:18px;}
.stpr-info .detail-author{display:flex;align-items:center;gap:8px;padding-bottom:18px;border-bottom:1px solid var(--border);margin-bottom:22px;}
.stpr-info .detail-content{font-size:15px;line-height:1.9;color:var(--text);white-space:pre-wrap;}

/* ===== SCHEDULE ===== */
.stpr-info .schedule-layout{display:grid;grid-template-columns:300px 1fr;max-width:1400px;margin:0 auto;align-items:start;}
.stpr-info .schedule-sidebar{padding:20px 16px;gap:20px;}
.stpr-info .mini-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;}
.stpr-info .mini-cal-month{font-size:15px;font-weight:900;color:var(--accent);}
.stpr-info .mini-cal-nav{background:none;border:none;cursor:pointer;color:var(--text-sub);font-size:16px;padding:4px 8px;border-radius:6px;transition:background .15s;display:flex;align-items:center;}
.stpr-info .mini-cal-nav:hover{background:var(--accent-light);color:var(--accent);}
.stpr-info .mini-cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:2px;text-align:center;}
.stpr-info .mini-cal-dow{font-size:10px;font-weight:700;color:var(--text-sub);padding:4px 0;}
.stpr-info .mini-cal-dow.sat{color:var(--accent-mid);}
.stpr-info .mini-cal-dow.sun{color:var(--pink);}
.stpr-info .mini-cal-day{font-size:12px;font-weight:700;padding:5px 2px;border-radius:6px;cursor:pointer;transition:background .15s;color:var(--text);border:none;background:none;position:relative;}
.stpr-info .mini-cal-day:hover{background:var(--accent-light);}
.stpr-info .mini-cal-day.today{background:var(--accent);color:#fff;border-radius:50%;}
.stpr-info .mini-cal-day.sat{color:var(--accent-mid);}
.stpr-info .mini-cal-day.sun{color:var(--pink);}
.stpr-info .mini-cal-day.other-month{color:#ccc;}
.stpr-info .mini-cal-day.has-event::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--pink);}
.stpr-info .mini-cal-day.today.has-event::after{background:#fff;}
.stpr-info .filter-section{display:flex;flex-direction:column;gap:6px;}
.stpr-info .filter-checkbox{display:flex;align-items:center;gap:10px;padding:8px 10px;border-radius:8px;cursor:pointer;transition:background .15s;background:none;border:none;width:100%;text-align:left;}
.stpr-info .filter-checkbox:hover{background:var(--bg);}
.stpr-info .check-box{width:18px;height:18px;border-radius:4px;border:2px solid var(--pink);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#fff;}
.stpr-info .check-box.on{background:var(--pink);}
.stpr-info .check-box.off{border-color:#cfd8e3;}
.stpr-info .check-box svg{width:10px;height:10px;}
.stpr-info .check-label{font-size:13px;font-weight:700;color:var(--text);}

.stpr-info .schedule-main{padding:20px 24px;}
.stpr-info .schedule-toolbar{display:flex;align-items:center;gap:12px;margin-bottom:20px;}
.stpr-info .view-tabs{display:flex;background:var(--pink-light);border-radius:10px;padding:3px;gap:2px;}
.stpr-info .view-tab{padding:7px 20px;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;background:none;border:none;color:var(--pink);}
.stpr-info .view-tab.active{background:var(--pink);color:#fff;}
.stpr-info .today-btn{padding:7px 16px;border-radius:20px;border:1px solid var(--border);background:var(--white);font-size:13px;font-weight:700;cursor:pointer;color:var(--text);transition:all .2s;}
.stpr-info .today-btn:hover{border-color:var(--accent);color:var(--accent);}
.stpr-info .nav-btns{display:flex;gap:4px;margin-left:auto;}
.stpr-info .nav-btn{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:var(--white);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-sub);transition:all .15s;}
.stpr-info .nav-btn:hover{border-color:var(--accent);color:var(--accent);}
.stpr-info .current-period{font-size:18px;font-weight:900;color:var(--accent);}

.stpr-info .month-grid{background:var(--white);border-radius:var(--radius);overflow:hidden;box-shadow:0 1px 6px rgba(0,83,151,.06);}
.stpr-info .month-dow-header{display:grid;grid-template-columns:repeat(7,1fr);background:var(--accent);}
.stpr-info .month-dow{padding:10px;text-align:center;font-size:12px;font-weight:700;color:#fff;opacity:.9;}
.stpr-info .month-dow.sat,.stpr-info .month-dow.sun{opacity:.7;}
.stpr-info .month-days{display:grid;grid-template-columns:repeat(7,1fr);}
.stpr-info .month-day{min-width:0;overflow:hidden;min-height:100px;border-right:1px solid var(--border);border-bottom:1px solid var(--border);padding:6px;cursor:pointer;transition:background .15s;}
.stpr-info .month-day .event-chip{max-width:100%;}
.stpr-info .month-day:hover{background:var(--accent-light);}
.stpr-info .month-day.today{background:rgba(0,83,151,.04);}
.stpr-info .month-day-num{font-size:13px;font-weight:700;width:26px;height:26px;display:flex;align-items:center;justify-content:center;border-radius:50%;margin-bottom:4px;color:var(--text);}
.stpr-info .month-day.today .month-day-num{background:var(--accent);color:#fff;}
.stpr-info .month-day.sat .month-day-num{color:var(--accent-mid);}
.stpr-info .month-day.sun .month-day-num{color:var(--pink);}
.stpr-info .month-day.other .month-day-num{color:#ccc;}
.stpr-info .event-chip{font-size:10px;font-weight:700;padding:2px 6px;border-radius:4px;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer;border:none;width:100%;text-align:left;display:block;}
.stpr-info .chip-live{background:#e3f2fd;color:#1565c0;}
.stpr-info .chip-event{background:#f3e5f5;color:#6a1b9a;}
.stpr-info .chip-goods{background:#fff3e0;color:#e65100;}
.stpr-info .chip-ticket{background:#e8f5e9;color:#2e7d32;}
.stpr-info .chip-stream{background:#e0f7fa;color:#00838f;}

.stpr-info .week-view{display:flex;flex-direction:column;}
.stpr-info .week-day-row{background:var(--white);border-radius:var(--radius);margin-bottom:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,83,151,.05);}
.stpr-info .week-day-header{display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);}
.stpr-info .week-date{font-size:15px;font-weight:900;color:var(--text);}
.stpr-info .week-date.today{color:var(--accent);}
.stpr-info .today-chip{font-size:10px;font-weight:900;background:var(--pink);color:#fff;padding:2px 8px;border-radius:10px;letter-spacing:.05em;}
.stpr-info .week-events{padding:12px 16px;display:flex;flex-direction:column;gap:6px;}
.stpr-info .week-event-item{display:flex;align-items:center;gap:12px;padding:10px 14px;border-radius:8px;cursor:pointer;transition:opacity .15s;border:none;width:100%;text-align:left;}
.stpr-info .week-event-item:hover{opacity:.8;}
.stpr-info .event-time{font-size:12px;font-weight:700;color:var(--text-sub);min-width:46px;flex-shrink:0;}
.stpr-info .event-info{flex:1;min-width:0;}
/* タイトル長に関係なく比率維持：折り返さず、はみ出しは … で省略 */
.stpr-info .event-name{font-size:14px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.stpr-info .event-sub{font-size:11px;color:var(--text-sub);margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.stpr-info .event-group-tag{font-size:11px;font-weight:700;padding:3px 8px;border-radius:10px;background:var(--pink-light);color:var(--pink);white-space:nowrap;flex-shrink:0;}
.stpr-info .no-event{padding:12px 16px;font-size:13px;color:var(--text-sub);}

/* ===== MODAL ===== */
.stpr-info .modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:300;display:flex;align-items:center;justify-content:center;padding:16px;}
.stpr-info .modal-box{background:var(--white);border-radius:16px;width:100%;max-width:720px;max-height:85vh;overflow-y:auto;position:relative;}
.stpr-info .modal-img{aspect-ratio:16/9;background:linear-gradient(135deg,#b8d0e5,#e6eef5);border-radius:16px 16px 0 0;overflow:hidden;}
.stpr-info .modal-img img{width:100%;height:100%;object-fit:cover;}
.stpr-info .modal-img.pink{background:linear-gradient(135deg,#fce4ec,#f8bbd9);}
.stpr-info .modal-body{padding:28px;}
.stpr-info .modal-meta{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.stpr-info .modal-title{font-size:24px;font-weight:900;line-height:1.4;margin-bottom:16px;color:var(--text);}
.stpr-info .modal-author{display:flex;align-items:center;gap:8px;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:20px;}
.stpr-info .author-icon{width:32px;height:32px;border-radius:50%;background:var(--pink-light);display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:var(--pink);}
.stpr-info .author-name{font-size:13px;font-weight:700;color:var(--pink);}
.stpr-info .modal-content{font-size:15px;line-height:1.8;color:var(--text);white-space:pre-wrap;}
.stpr-info .modal-detail-link{display:inline-block;margin-top:18px;font-size:13px;font-weight:700;color:var(--accent);text-decoration:none;}
.stpr-info .modal-detail-link:hover{text-decoration:underline;}
.stpr-info .modal-spoiler{margin-bottom:16px;padding:8px 12px;border-radius:8px;background:#fff8e1;border:1px solid #ffe082;color:#a06800;font-size:12px;font-weight:700;}
.stpr-info .modal-close{position:absolute;top:12px;right:12px;width:32px;height:32px;border-radius:50%;background:rgba(0,0,0,.12);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text);transition:background .15s;z-index:1;}
.stpr-info .modal-close:hover{background:rgba(0,0,0,.22);}
`
