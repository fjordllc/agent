import { useEffect, useState } from "react";
import Link from "next/link";
import supabase from "../lib/supabase";
import { Database } from "../lib/database.types";
import styles from "./Companies.module.css";

type ICompany = Database["public"]["Tables"]["companies"]["Row"];

function initial(name: string | null): string {
  if (!name) return "—";
  const ch = name.replace(/^[(（]?(株|有|合同会社|有限会社|株式会社)[)）]?/u, "").trim()[0];
  return ch ?? "—";
}

export default function Companies() {
  const [companies, setCompanies] = useState<ICompany[]>();

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.from("companies").select("*");
      if (cancelled) return;
      if (error) {
        console.error("企業一覧の取得に失敗しました", error);
        setCompanies([]);
        return;
      }
      if (data) setCompanies(data);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const count = companies?.length ?? 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.pageHead}>
          <div>
            <div className={styles.tag}>COMPANIES</div>
            <h1>企業</h1>
            <p className={styles.sub}>
              紹介先としてご縁のある {count} 社。最近のやりとりと、現在お預かりしている求人の数をひと目で。
            </p>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnGhost}`}
              disabled
              aria-disabled="true"
              title="未実装 — 機能は準備中です"
            >
              CSV出力
            </button>
            <Link href="/companies/new" className={`${styles.btn} ${styles.btnPrimary}`}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              企業を追加
            </Link>
          </div>
        </div>

        <div className={styles.toolbar}>
          <div className={styles.search}>
            <span className={styles.searchIcon} aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" strokeLinecap="round" />
              </svg>
            </span>
            <input
              aria-label="企業名・業種・担当者で検索"
              placeholder="企業名・業種・担当者"
            />
          </div>
          <button type="button" className={styles.filterChip}>
            業種 <span className={styles.chipCaret}>▾</span>
          </button>
          <button type="button" className={styles.filterChip}>
            関係性 <span className={styles.chipCaret}>▾</span>
          </button>
          <button type="button" className={styles.filterChip}>
            担当 <span className={styles.chipCaret}>▾</span>
          </button>
        </div>

        <div className={styles.panel}>
          <table className={styles.list}>
            <thead>
              <tr>
                <th>企業</th>
                <th>業種・所在</th>
                <th>状況</th>
                <th style={{ textAlign: "right" }}>公開求人</th>
                <th style={{ textAlign: "right" }}>進行中候補</th>
                <th>最終接触</th>
                <th style={{ width: 80 }}></th>
              </tr>
            </thead>
            <tbody>
              {companies?.map((c) => (
                <CompanyRow key={c.id} company={c} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CompanyRow({ company }: { company: ICompany }) {
  return (
    <tr>
      <td>
        <div className={styles.coCell}>
          <div className={styles.logo}>{initial(company.name)}</div>
          <div>
            <div className={styles.coName}>{company.name ?? "—"}</div>
            {company.memo && <div className={styles.coSub}>{company.memo}</div>}
          </div>
        </div>
      </td>
      <td className={styles.muted}>{company.website ?? "—"}</td>
      <td>
        <span className={`${styles.status} ${styles.statusOpen}`}>
          <span className={styles.statusDot}></span>取引中
        </span>
      </td>
      <td className={styles.right}>
        <span className={styles.num}>—</span>
      </td>
      <td className={styles.right}>
        <span className={styles.num}>—</span>
      </td>
      <td className={styles.muted}>—</td>
      <td className={styles.right}>
        <div className={styles.rowActions}>
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="編集"
            disabled
            aria-disabled="true"
            title="未実装 — 機能は準備中です"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path
                d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
