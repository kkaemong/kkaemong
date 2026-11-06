import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { portfolioData, type Project, type TroubleShooting } from '@/data/portfolio';
import ForceLight from '@/components/ForceLight';
import { GameArt, InteractiveArt } from '@/components/BlobArt';
import ProjectNav from '@/components/ProjectNav';
import { IMPL_SLIDES, type ImplSlideData, type ImplCode, type ImplMedia } from '@/data/implSlides';

// 제출용 심플 버전: 장식 없이 한눈에 읽히게 정리한 정적 페이지. 내용은 인터랙티브 버전과 같은 데이터(portfolio.ts)를 읽는다.
// 순서: 소개(Info·학력/교육) -> 기술(Skill) -> 프로젝트마다 [개요 -> 기여 -> 트러블슈팅]
export const metadata: Metadata = {
  title: '진준영 · 게임 클라이언트 개발자 (심플 버전)',
  description: '게임 클라이언트 개발자 진준영의 이력과 프로젝트를 한눈에 정리한 버전입니다.',
};

const SERIF = 'font-[family-name:var(--font-noto-serif)]';
const MARK = 'bg-[linear-gradient(transparent_62%,rgba(228,87,46,0.22)_62%)] px-1'; // 형광펜으로 칠한 듯한 밑줄

const hostName = (url: string) => {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).host.replace('www.', '');
  } catch {
    return url;
  }
};

// 학력·교육·경험 순서: SSAFY → K-Shield Jr → 협성대학교 → 해외 거주(portfolio.ts의 experience id)
const EDU_ORDER = [1, 3, 2, 4];

// 칸마다 큰 연회색 제목 띠와 가는 선으로 나눠서, 내용 사이에 여백을 충분히 둔다
function Band({ title, id, children }: { title: string; id?: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-[#111]/15 first:border-t-0">
      <h2 id={id} className="scroll-mt-24 px-10 py-9 text-4xl font-light tracking-tight text-[#8a8780] lg:px-12">{title}</h2>
      <div className="border-t border-[#111]/10 px-10 py-10 lg:px-12">{children}</div>
    </section>
  );
}

// PPT 한 장처럼: 화면 한 장에 들어오는 흰 틀. 왼쪽에는 손으로 그린 듯한 세로선과 동그라미, 큰 번호가 있다.
function Slide({ label, counter, children, className = '' }: { label: [string, string]; counter?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`relative mx-auto w-full max-w-[1720px] scroll-mt-2 overflow-hidden border border-[#111]/10 bg-white shadow-[0_14px_44px_-26px_rgba(0,0,0,0.35)] px-6 py-14 sm:px-12 lg:flex lg:min-h-[max(680px,min(calc(100vh-1rem),980px))] lg:flex-col lg:py-16 lg:pl-[230px] lg:pr-20 ${className}`}>
      {/* 손으로 그린 듯한 세로선(큰 화면에서만) */}
      <svg aria-hidden className="pointer-events-none absolute left-[176px] top-0 hidden h-full w-8 lg:block" viewBox="0 0 32 1000" preserveAspectRatio="none" fill="none">
        <path
          d="M16 0 C 22 90, 9 170, 15 260 S 24 420, 14 520 S 8 700, 17 790 S 21 930, 15 1000"
          stroke="#e4572e"
          strokeOpacity="0.45"
          strokeWidth="1.6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {/* 손으로 그린 듯한 동그라미(제목 높이) */}
      <svg aria-hidden className="absolute left-[170px] top-[43%] hidden h-9 w-9 lg:block" viewBox="0 0 36 36" fill="none">
        <path d="M19 5 C 28 4, 33 12, 31 20 C 29 29, 19 33, 11 29 C 4 25, 3 14, 10 8 C 14 5, 21 4, 26 8" stroke="#e4572e" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="18" cy="18" r="3.4" fill="#e4572e" />
      </svg>
      {/* 라벨: 작은 영문 위에 큰 번호 */}
      <div className="absolute left-6 top-6 sm:left-12 lg:left-14 lg:top-10 lg:w-32">
        <p className="text-xs uppercase tracking-[0.22em] text-[#e4572e]">{label[0]}</p>
        <p className={`mt-1 text-6xl font-light leading-none text-[#e4572e]/30 lg:text-7xl ${SERIF}`}>{label[1]}</p>
      </div>
      {counter && <p className="absolute right-6 top-6 text-base text-[#5a5853] sm:right-12 lg:right-16 lg:top-10">{counter}</p>}
      {children}
    </section>
  );
}

// 상세 장(트러블슈팅): 위에 큰 제목과 프로젝트 이름, ✓ 소제목 아래 짧은 줄, 그 아래에 그림
function DetailSlide({ title, counter, children }: { title: string; counter: string; children: React.ReactNode }) {
  return (
    <section className="relative mx-auto flex w-full max-w-[1720px] flex-col scroll-mt-2 overflow-hidden border border-[#111]/10 bg-white shadow-[0_14px_44px_-26px_rgba(0,0,0,0.35)] px-6 py-12 sm:px-12 lg:min-h-[max(680px,min(calc(100vh-1rem),980px))] lg:px-20 lg:py-14">
      <div className="mb-10 flex items-start justify-between gap-6">
        <h4 className={`break-keep text-4xl font-normal leading-tight tracking-tight lg:text-6xl ${SERIF}`}>{title}</h4>
        <p className="shrink-0 pt-3 text-base text-[#5a5853]">{counter}</p>
      </div>
      {children}
    </section>
  );
}

// ✓ 소제목과 그 아래 대시(-) 줄들
function Point({ heading, lines }: { heading: string; lines: string[] }) {
  return (
    <div className="mb-8">
      <p className="mb-3 flex items-center gap-3 text-2xl font-semibold lg:text-3xl">
        <CheckCircle2 aria-hidden className="h-7 w-7 shrink-0 text-[#e4572e]" strokeWidth={1.8} />
        {heading}
      </p>
      <ul className="space-y-2 pl-10 text-xl leading-9 text-[#1f1e1c] lg:text-2xl lg:leading-10">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-4 break-keep">
            <span aria-hidden className="text-[#5a5853]">-</span>
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 문장 몇 개만 앞에서부터 가져온다(개요 슬라이드에 알맞은 길이로)
const firstSentences = (text: string, n = 2) => (text.match(/[\s\S]*?[.!?](?=\s|$)/g) ?? [text]).slice(0, n).join(' ').trim();
// 제목은 ' — ' 앞부분만(너무 짧으면 전체)
const shortTitle = (t: string) => {
  const head = t.split(' — ')[0].trim();
  return head.length >= 5 ? head : t;
};


function TroubleSlide({ item, index, total, project }: { item: TroubleShooting; index: number; total: number; project: Project }) {
  const shots: { src: string; caption?: string }[] = [];
  if (item.beforeImageUrl) shots.push({ src: item.beforeImageUrl, caption: '수정 전' });
  if (item.afterImageUrl) shots.push({ src: item.afterImageUrl, caption: '수정 후' });
  if (item.imageUrl) shots.push({ src: item.imageUrl });
  (item.images ?? []).forEach((im) => {
    if (!/\.(mp4|webm)$/i.test(im.src)) shots.push({ src: im.src, caption: im.caption });
  });
  const code = item.codeSnippet;

  return (
    <DetailSlide title={`${index + 1}. ${shortTitle(item.title)}`} counter={`${project.title} · ${index + 2} / ${total}`}>
      <Point heading="문제" lines={[firstSentences(item.problem, 1)]} />
      <Point heading="해결" lines={[firstSentences(item.solution, 1)]} />

      {(shots.length > 0 || code) && (
        <div className={`mt-2 grid max-w-6xl items-start gap-8 lg:gap-12 ${shots.length > 0 && code ? 'lg:grid-cols-[1fr_1.3fr]' : ''}`}>
          {shots.length > 0 && (
            <div className={`grid gap-5 ${shots.length > 1 ? 'grid-cols-2' : ''}`}>
              {shots.map((sh) => (
                <figure key={sh.src}>
                  {sh.caption && <figcaption className="mb-2 text-base text-[#5a5853]">{sh.caption}</figcaption>}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-white shadow-[0_14px_34px_-20px_rgba(0,0,0,0.4)]">
                    <Image src={sh.src} alt={sh.caption ?? item.title} fill sizes="(min-width: 1024px) 420px, 50vw" quality={80} className="object-contain" />
                  </div>
                </figure>
              ))}
            </div>
          )}
          {code && (
            <figure>
              <figcaption className="mb-2 text-base text-[#5a5853]">
                {code.filename}
                {code.before ? ' · 수정 후' : ''}
              </figcaption>
              <pre className="max-h-[250px] overflow-auto bg-[#14151a] p-5 text-[13px] leading-relaxed text-[#e4e6eb] shadow-[0_14px_34px_-20px_rgba(0,0,0,0.5)]">{code.code}</pre>
            </figure>
          )}
        </div>
      )}

    </DetailSlide>
  );
}

// 코드 발췌 한 덩어리: 어두운 바탕, 강조 줄은 주황 띠
function CodeBlock({ filename, code, hl = [], inset }: ImplCode) {
  const rows = code.split('\n');
  return (
    <figure className={`relative ${inset ? 'mb-14' : ''}`}>
      <figcaption className="mb-2 text-base text-[#5a5853]">{filename}</figcaption>
      <pre className="overflow-x-auto bg-[#14151a] py-4 text-[13px] leading-relaxed text-[#e4e6eb] shadow-[0_14px_34px_-20px_rgba(0,0,0,0.5)] lg:text-sm">
        {rows.map((row, i) => (
          <span key={i} className={`block whitespace-pre px-5 ${hl.includes(i + 1) ? 'bg-[#e4572e]/25' : ''}`}>
            {row || ' '}
          </span>
        ))}
      </pre>
      {inset && (
        <div className="absolute -bottom-12 right-5 max-w-[46%] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.75)] ring-1 ring-white/25">
          {inset.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={inset.src} alt={inset.alt ?? filename} className="block max-h-[200px] w-auto max-w-full" />
          ) : (
            <pre className="bg-[#0c0d11] px-4 py-3 font-mono text-[12px] leading-5 text-[#e4e6eb]">{inset.code}</pre>
          )}
        </div>
      )}
    </figure>
  );
}

// strip 흐름: group이 같은 연속 사진은 한 칸(위아래)으로 묶고, 번호는 사진마다 차례로 매긴다
function stripSteps(media: ImplMedia[]) {
  const steps: { m: ImplMedia; n: number }[][] = [];
  media.forEach((m, i) => {
    const last = steps[steps.length - 1];
    if (m.group != null && last && last[0].m.group === m.group) last.push({ m, n: i + 1 });
    else steps.push([{ m, n: i + 1 }]);
  });
  return steps;
}

// 구현 슬라이드: 큰 소제목 → 구현 사항(최대 3줄) → 코드 발췌 → 필요한 곳만 이미지/영상
function ImplSlide({ data, index, counter }: { data: ImplSlideData; index: number; counter: string }) {
  return (
    <DetailSlide title={`${index}. ${data.title}`} counter={counter}>
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="space-y-6">
          <Point heading="구현 사항" lines={data.lines} />
          {data.leftCode && <CodeBlock {...data.leftCode} />}
          {data.leftImage && (
            <figure>
              {data.leftImage.caption && <figcaption className="mb-2 text-base text-[#5a5853]">{data.leftImage.caption}</figcaption>}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.leftImage.src} alt={data.leftImage.caption ?? data.title} className="max-h-[210px] w-auto max-w-full shadow-[0_14px_34px_-20px_rgba(0,0,0,0.5)]" />
            </figure>
          )}
        </div>
        <div className="space-y-6">
          {data.codes.map((c) => (
            <CodeBlock key={c.filename} {...c} />
          ))}
        </div>
      </div>
      {data.media && data.media.length > 0 && data.strip && (
        <div className="mt-8 lg:-mx-10">
          {[stripSteps(data.media)].map((row, ri) => (
            <ol key={ri} className="flex items-center gap-1 overflow-x-auto pb-4">
              {row.map((step, si) => {
                const grouped = step.length > 1;
                const hideArrow = si === row.length - 1; // 마지막 칸은 화살표 없이 자리만 맞춘다
                const figure = ({ m, n }: { m: ImplMedia; n: number }) => (
                  <figure key={m.src}>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#f4f2ee] shadow-[0_12px_28px_-18px_rgba(0,0,0,0.45)]">
                      <Image src={m.src} alt={m.caption ?? data.title} fill sizes="(min-width: 1024px) 300px, 45vw" quality={88} unoptimized={m.src.endsWith('.gif')} className="object-cover" />
                    </div>
                    <figcaption className="mt-2 text-center text-base leading-snug text-[#34322e]">
                      <span className="mr-1.5 text-sm text-[#e4572e]">{n}</span>
                      {m.caption}
                    </figcaption>
                    {m.state && (
                      <p className="mt-1 text-center">
                        <span className="inline-block rounded bg-[#14151a] px-2 py-0.5 font-mono text-[11px] leading-5 text-[#ffd8a8]">{m.state}</span>
                      </p>
                    )}
                  </figure>
                );
                return (
                  <li
                    key={step[0].m.src}
                    style={{ flexBasis: `calc((100% - ${(row.length - 1) * 0.25}rem) / ${row.length})` }}
                    className={`flex min-w-[130px] flex-none gap-1 ${grouped ? 'items-stretch' : 'items-center'}`}
                  >
                    <div className="flex-1">
                      {grouped ? (
                        <div className="flex flex-col gap-1">
                          {step.map((it, k) => (
                            <div key={it.m.src}>
                              {figure(it)}
                              {k < step.length - 1 && <p aria-hidden className="text-center text-xl leading-6 text-[#e4572e]/70">↓</p>}
                            </div>
                          ))}
                        </div>
                      ) : (
                        figure(step[0])
                      )}
                    </div>
                    {/* 일렬 흐름 →. 묶음에서는 아래쪽 사진(4번)에서 다음 칸으로 올라가며 이어진다 */}
                    <span
                      aria-hidden
                      className={`w-5 shrink-0 text-center text-xl text-[#e4572e]/70 ${grouped ? 'self-end pb-[4.5rem]' : 'self-center'} ${hideArrow ? 'invisible' : ''}`}
                    >
                      {grouped ? '↗' : '→'}
                    </span>
                  </li>
                );
              })}
            </ol>
          ))}
        </div>
      )}
      {data.media && data.media.length > 0 && !data.strip && (
        <div className={`mt-10 grid gap-6 ${data.media.length > 1 ? 'sm:grid-cols-2' : ''}`}>
          {data.media.map((m) => (
            <figure key={m.src}>
              {m.caption && <figcaption className="mb-2 text-base text-[#5a5853]">{m.caption}</figcaption>}
              {m.kind === 'video' ? (
                <video src={m.src} autoPlay loop muted playsInline className="w-full bg-white shadow-[0_14px_34px_-20px_rgba(0,0,0,0.4)]" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.src} alt={m.caption ?? data.title} className="w-full bg-white shadow-[0_14px_34px_-20px_rgba(0,0,0,0.4)]" />
              )}
            </figure>
          ))}
        </div>
      )}
    </DetailSlide>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const impl = IMPL_SLIDES[project.id] ?? [];
  // 구현 슬라이드가 있는 프로젝트는 그것을, 없으면 트러블슈팅 슬라이드를 보여 준다
  const studies = impl.length > 0 ? [] : project.troubleshooting ?? [];
  const total = impl.length + studies.length + 1;
  const links: { label: string; href: string }[] = [];
  if (project.github) links.push({ label: 'GitHub', href: project.github });
  if (project.downloadUrl) links.push({ label: '플레이 빌드 다운로드', href: project.downloadUrl });

  return (
    <article id={`project-${project.id}`} className="scroll-mt-6 space-y-6">
      {/* 1장: 개요 */}
      <Slide label={['Project', String(index + 1).padStart(2, '0')]} counter={`${project.title} · 1 / ${total}`}>
        <div className={`grid gap-10 pt-14 lg:flex-1 lg:gap-16 lg:pt-0 ${project.image ? 'lg:grid-cols-[1fr_0.95fr]' : ''}`}>
          <div className="flex flex-col justify-between gap-12">
            <div className="lg:mt-[clamp(40px,11vh,120px)]">
              <p className={`mb-2 text-3xl font-light leading-snug text-[#34322e] lg:text-4xl ${SERIF}`}>{project.type}</p>
              <h3 className={`mb-8 break-keep text-5xl font-light leading-[1.2] tracking-tight lg:text-7xl ${SERIF}`}>
                <span className={MARK}>{project.title}</span>
                {project.wip && <span className="ml-4 align-middle text-xl font-normal tracking-normal text-[#5a5853]">개발중</span>}
              </h3>
              <p className="max-w-xl break-keep text-xl font-light leading-9 text-[#6b6862] lg:text-[1.4rem] lg:leading-9">
                {project.detailedDescription ? firstSentences(project.detailedDescription, 1) : project.description}
              </p>
            </div>
            <dl className="grid max-w-xl grid-cols-[7rem_1fr] gap-x-4 text-lg leading-8 [&>dd]:border-b [&>dd]:border-[#111]/10 [&>dd]:py-1.5 [&>dt]:border-b [&>dt]:border-[#111]/10 [&>dt]:py-1.5 [&>dt]:text-sm [&>dt]:tracking-[0.2em] [&>dt]:text-[#e4572e] [&>dt]:pt-2.5">
              {project.teamSize && (
                <>
                  <dt>TEAM</dt>
                  <dd>{project.teamSize}</dd>
                </>
              )}
              {project.role && (
                <>
                  <dt>ROLE</dt>
                  <dd>{project.role.replace(' (상자·포장·어항·썰매·디스펜서)', '')}</dd>
                </>
              )}
              <dt>SKILL</dt>
              <dd>{project.tech.join(', ')}</dd>
              {project.period && (
                <>
                  <dt>PERIOD</dt>
                  <dd>{project.period}</dd>
                </>
              )}
              {links.length > 0 && (
                <>
                  <dt>LINK</dt>
                  <dd className="flex flex-wrap gap-x-5 gap-y-1">
                    {links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/40 hover:border-[#111]">
                        {l.label} ↗
                      </a>
                    ))}
                  </dd>
                </>
              )}
            </dl>
          </div>

          {project.image && (
            <div className="relative flex items-center">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[22px] border-[6px] border-white bg-white shadow-[0_18px_40px_-22px_rgba(0,0,0,0.35)]">
                <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 760px, 100vw" quality={88} className="object-cover" />
              </div>
            </div>
          )}
        </div>
      </Slide>

      {/* 2장부터: 구현 슬라이드 또는 트러블슈팅(한 가지씩) */}
      {impl.map((d, i) => (
        <ImplSlide key={d.title} data={d} index={i + 1} counter={`${project.title} · ${i + 2} / ${total}`} />
      ))}
      {studies.map((st, i) => (
        <TroubleSlide key={st.title} item={st} index={i} total={total} project={project} />
      ))}
    </article>
  );
}

// 마지막: 틀과 그림자 없이 담백한 감사 인사와 연락처
function ClosingSlide({ email, github, blog }: { email: string; github: string; blog: string }) {
  const contacts = [
    { label: 'EMAIL', value: email, href: `mailto:${email}` },
    { label: 'GITHUB', value: github, href: `https://${github}` },
    { label: 'BLOG', value: hostName(blog), href: blog },
  ];
  // 이 페이지 다음에 이어 볼 수 있는 다른 버전(둘 다 아직 개발 중)
  const more = [
    { href: '/game', no: '01', title: '게임으로 보는 포트폴리오', desc: '영상과 체험판으로 직접 플레이해 보세요.', tint: '#f1eee6', Art: GameArt },
    { href: '/interactive', no: '02', title: '인터랙티브 포트폴리오', desc: '움직이고 반응하는 이야기로 만나 보세요.', tint: '#e9edf1', Art: InteractiveArt },
  ];
  return (
    <section className="mx-auto flex min-h-[90vh] w-full max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
      <h3 className={`text-6xl font-light tracking-tight lg:text-8xl ${SERIF}`}>Thank you</h3>
      <p className={`mt-6 text-3xl font-light lg:text-4xl ${SERIF}`}>
        <span className={MARK}>감사합니다.</span>
      </p>
      <p className="mt-8 break-keep text-lg leading-8 text-[#5a5853] lg:text-xl">
        작동하는 코드를 넘어, 몰입되는 플레이를 만드는
        <br />
        게임 클라이언트 개발자 진준영입니다.
      </p>

      <div aria-hidden className="my-12 h-16 w-px bg-[#111]/25" />

      <p className="mb-5 text-xs tracking-[0.28em] text-[#e4572e]">ANOTHER WAY TO SEE</p>
      <div className="grid w-full gap-6 sm:grid-cols-2">
        {more.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="group overflow-hidden rounded-[28px] bg-white text-left shadow-[0_18px_50px_-26px_rgba(0,0,0,0.4)] ring-1 ring-[#111]/10 transition-transform hover:-translate-y-1.5"
          >
            <div className="relative flex h-52 items-center justify-center" style={{ background: m.tint }}>
              <span className="block h-28 w-28 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                <m.Art />
              </span>
              <span className={`absolute left-6 top-5 text-3xl font-light text-[#1c1b19]/35 ${SERIF}`}>{m.no}</span>
              <span className="absolute right-5 top-5 rounded-full border border-[#e4572e] bg-white/70 px-2.5 py-1 text-xs leading-none text-[#e4572e]">개발중</span>
            </div>
            <div className="px-7 py-6">
              <p className="text-2xl font-semibold leading-snug">{m.title}</p>
              <p className="mt-2 break-keep text-base leading-7 text-[#5a5853]">{m.desc}</p>
              <p className="mt-5 inline-flex items-center gap-2 border-b border-[#111]/40 pb-0.5 text-base text-[#1f1e1c] transition-colors group-hover:border-[#e4572e] group-hover:text-[#e4572e]">
                보러 가기
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </p>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-lg text-[#5a5853]">
        {contacts.map((c) => (
          <a key={c.label} href={c.href} target={c.label === 'EMAIL' ? undefined : '_blank'} rel="noopener noreferrer" className="hover:text-[#111] hover:underline">
            <span className="mr-2 text-xs tracking-[0.2em] text-[#e4572e]">{c.label}</span>
            {c.value}
          </a>
        ))}
      </p>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <Link href="/" className="rounded-full bg-[#1f1e1c] px-7 py-3.5 text-base text-white transition-colors hover:bg-[#e4572e]">← 메인 페이지로</Link>
        <a href="#" className="rounded-full border border-[#111]/25 px-7 py-3.5 text-base text-[#1f1e1c] transition-colors hover:border-[#111]/60">↑ 맨 위로</a>
      </div>
    </section>
  );
}

export default function SimplePage() {
  const { contact, skills, experience } = portfolioData;
  // 인적사항: 이름·생년월일·사는 곳·이메일(전화번호·학력은 드러내지 않는다)
  const info = portfolioData.about.personalInfo;
  const infoOf = (label: string) => info.find((it) => it.label === label)?.value ?? '';
  const personalInfo = [
    { label: '이름', value: infoOf('이름') },
    { label: '생년월일', value: infoOf('생년월일') },
    { label: '사는 곳', value: infoOf('주소지') },
    { label: '이메일', value: infoOf('이메일') },
  ].filter((it) => it.value);
  // 보조 기술은 중요도 순서로: TypeScript -> Python -> Django
  const subOrder = ['TypeScript', 'Python', 'Django'];
  const subSkills = [...skills.sub].sort((x, y) => (subOrder.indexOf(x.name) + 1 || 99) - (subOrder.indexOf(y.name) + 1 || 99));
  // 프로젝트: 최신 것이 위로
  const all = portfolioData.projects as Project[];
  const projects = [...all].sort((x, y) => y.period.localeCompare(x.period));
  // 수상: 삼성 청년 SW 아카데미 특화 프로젝트 우수상(자본주 E.T.)
  const awardProject = all.find((p) => p.id === 'zabonzooet');
  // 한눈에 보이는 개요용 짧은 표기
  const endOf = (period: string) => (period.split('~')[1] ?? period).trim().replace(/\s*\(.*\)/, '').slice(0, 7); // 끝나는 달
  const shortPeriod = (p: Project) => (!p.period ? '' : p.wip ? `${p.period.split('~')[0].trim()} ~ 개발중` : `${p.period.split('~')[0].trim().slice(0, 7)} ~ ${endOf(p.period)}`);
  // 기술: 핵심(C#, Unity)은 키워드로, 보조는 '경험' 한 줄로
  const coreKeys: Record<string, string> = {
    'C#': 'Unity 핵심 스크립팅 언어로, 상태머신(FSM)과 팀 공통 인터페이스에 맞춘 오브젝트 상호작용을 구현했습니다.',
    Unity: '2D/3D 인게임 인터랙션 설계와 애니메이터 상태 제어, 점프·스크롤 등 물리 로직 구현을 담당했습니다.',
  };
  const subKeys: Record<string, string> = {
    TypeScript: 'React 기반 실시간 멀티플레이 웹 게임의 연출 페이즈와 UI 애니메이션 구현을 경험했습니다.',
    Python: '알고리즘 문제 해결과, VQA 모델 학습·추론·Kaggle 제출 파일 생성 파이프라인(AI Challenge)을 경험했습니다.',
    Django: 'Vue 프론트와 연동되는 계정·커뮤니티·식단 REST API 일부 작성을 경험했습니다.',
  };

  return (
    <div className="simple-root min-h-screen bg-white text-[#111]">
      <ForceLight />
      <ProjectNav items={projects.map((p) => ({ id: p.id, title: p.title }))} />

      {/* 한 페이지로 같이 스크롤: 위는 왼쪽에 인적사항, 오른쪽에 기술. 그 아래로 프로젝트가 두 칸에 나란히 들어간다 */}
      <main className="w-full px-6 pb-24 pt-10 sm:px-12 lg:px-16 lg:pt-10">
        {/* 위쪽 세 칸(한눈에): 왼쪽 인적사항 / 가운데 학력과 기술 / 오른쪽 프로젝트 개요. 얇은 선으로 나눈다 */}
        <div className="mb-28 grid gap-14 lg:min-h-[calc(100vh-3rem)] lg:grid-cols-[1.05fr_1fr_1fr] lg:gap-0">
          {/* 1. 인적사항 */}
          <aside id="info" className="scroll-mt-24 lg:px-6 lg:pt-4">
            <div className="mx-auto w-full max-w-[535px]">
            <Image src="/profile.jpg" alt="진준영" width={827} height={1063} sizes="(min-width: 1024px) 580px, 90vw" quality={92} className="mb-7 aspect-[4/5] w-full rounded-sm object-cover object-top" priority />
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.25em] text-[#5a5853] sm:text-[15px]">Game Client Developer</p>
            <h1 className="sr-only">진준영</h1>
            <p className={`mb-6 break-keep text-xl font-light leading-snug text-[#1f1e1c] lg:text-[2rem] ${SERIF}`}>작동하는 코드를 넘어, 몰입되는 플레이를 만듭니다.</p>
            <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-4 gap-y-3 border-t border-[#111]/10 pt-6 text-xl leading-8">
              {personalInfo.map((it) => (
                <div key={it.label} className="contents">
                  <dt className="text-[#5a5853]">{it.label}</dt>
                  <dd className="break-words">{it.value}</dd>
                </div>
              ))}
              <dt className="text-[#5a5853]">GitHub</dt>
              <dd className="break-words"><a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/30 hover:border-[#111]">{contact.github}</a></dd>
              <dt className="text-[#5a5853]">블로그</dt>
              <dd><a href={contact.blog} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/30 hover:border-[#111]">{hostName(contact.blog)}</a></dd>
            </dl>
            </div>
          </aside>

          {/* 2. 학력과 기술 */}
          <div className="lg:border-l lg:border-[#111]/15">
            <Band title="Education & Experience">
              <ul className="space-y-6">
                {EDU_ORDER.map((id) => experience.find((e) => e.id === id)!).map((e) => (
                  <li key={e.id} className="flex items-baseline justify-between gap-4">
                    <p className="text-lg font-semibold leading-snug">{e.title}</p>
                    <p className="shrink-0 text-base text-[#5a5853]">{e.period}</p>
                  </li>
                ))}
              </ul>
            </Band>
            <Band title="Skill" id="skills">
              <p className="mb-5 text-sm font-semibold tracking-[0.25em] text-[#8a8780]">주력</p>
              <ul className="space-y-8">
                {skills.main.map((s) => (
                  <li key={s.name}>
                    <p className="text-2xl font-semibold leading-tight">{s.name}</p>
                    <p className="mt-1.5 text-base leading-7 text-[#5a5853]">{coreKeys[s.name] ?? ''}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-t border-[#111]/10 pt-10">
                <p className="mb-5 text-sm font-semibold tracking-[0.25em] text-[#8a8780]">보조</p>
                <ul className="space-y-7">
                  {subSkills.map((s) => (
                    <li key={s.name}>
                      <p className="text-lg font-semibold leading-tight">{s.name}</p>
                      <p className="mt-1 text-base leading-7 text-[#5a5853]">{subKeys[s.name] ?? ''}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Band>
          </div>

          {/* 3. 프로젝트 */}
          <div className="lg:border-l lg:border-[#111]/15">
            <Band title="Projects">
              <ol className="space-y-9">
                {projects.map((p, i) => (
                  <li key={p.id}>
                    <div>
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="text-xl font-semibold leading-snug">
                          {String(i + 1).padStart(2, '0')}. {p.title}
                        </p>
                        <p className="shrink-0 text-base text-[#5a5853]">{shortPeriod(p)}</p>
                      </div>
                      <p className="mt-1.5 break-keep text-base leading-7 text-[#5a5853]">· {p.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Band>
            {awardProject && (
              <Band title="Awards">
                <ul className="space-y-6">
                  <li className="flex items-baseline justify-between gap-4">
                    <p className="text-lg font-semibold leading-snug">삼성 청년 SW 아카데미 특화 프로젝트 우수상</p>
                    <p className="shrink-0 text-base text-[#5a5853]">{endOf(awardProject.period)}</p>
                  </li>
                </ul>
              </Band>
            )}
          </div>
        </div>

        {/* 프로젝트: 한 장씩 */}
        <section>
          <div
            className="-mx-6 space-y-24 px-4 pb-40 pt-40 sm:-mx-12 sm:px-6 lg:-mx-16 lg:px-6"
            style={{ background: 'linear-gradient(to bottom, #fff 0, #eeece8 160px, #eeece8 calc(100% - 160px), #fff 100%)' }}
          >
            <h2 id="projects" className={`mx-auto w-full max-w-[1720px] scroll-mt-4 px-2 text-4xl font-light tracking-tight sm:text-5xl ${SERIF}`}>
              <span className={MARK}>Project · 프로젝트</span>
            </h2>
            {projects.map((p, i) => (
              <ProjectBlock key={p.id} project={p} index={i} />
            ))}
          </div>
          <ClosingSlide email={infoOf('이메일')} github={contact.github} blog={contact.blog} />
        </section>
      </main>
    </div>
  );
}
