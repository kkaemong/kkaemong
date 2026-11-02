import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData, type Project } from '@/data/portfolio';
import ThemeToggle from '@/components/ThemeToggle';

// 일반 버전: 장식 없이 읽기 쉽게 정리한 정적 페이지. 내용은 인터랙티브 버전과 같은 데이터(portfolio.ts)를 읽는다.
export const metadata: Metadata = {
  title: '진준영 · 게임 클라이언트 개발자 (일반 버전)',
  description: '게임 클라이언트 개발자 진준영의 이력과 프로젝트를 한눈에 정리한 버전입니다.',
};

const SERIF = 'font-[family-name:var(--font-noto-serif)]';

const hostName = (url: string) => {
  try {
    return new URL(url.startsWith('http') ? url : `https://${url}`).host.replace('www.', '');
  } catch {
    return url;
  }
};

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className={`mb-10 scroll-mt-24 border-b border-[#111]/15 pb-4 text-3xl font-light tracking-tight sm:text-4xl ${SERIF}`}>
      {children}
    </h2>
  );
}

function ProjectBlock({ project, index }: { project: Project; index: number }) {
  const studies = project.troubleshooting ?? [];
  const links: { label: string; href: string }[] = [];
  if (project.github) links.push({ label: 'GitHub', href: project.github });
  if (project.downloadUrl) links.push({ label: '플레이 빌드 다운로드', href: project.downloadUrl });

  return (
    <article className="border-b border-[#111]/10 pb-14 last:border-0">
      <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#8a8780]">{String(index + 1).padStart(2, '0')} · {project.type}</p>
      <h3 className={`mb-4 text-3xl font-light leading-snug tracking-tight sm:text-4xl ${SERIF}`}>
        {project.title}
        {project.wip && <span className="ml-3 align-middle text-sm font-normal tracking-wide text-[#8a8780]">개발중</span>}
        {!project.wip && project.award && <span className="ml-3 align-middle text-sm font-normal tracking-wide text-[#a8742a]">{project.award}</span>}
      </h3>

      <dl className="mb-6 grid grid-cols-[5rem_1fr] gap-x-4 gap-y-1.5 text-sm">
        <dt className="text-[#8a8780]">기간</dt>
        <dd>{project.period}</dd>
        {project.teamSize && (
          <>
            <dt className="text-[#8a8780]">인원</dt>
            <dd>{project.teamSize}</dd>
          </>
        )}
        {project.role && (
          <>
            <dt className="text-[#8a8780]">담당</dt>
            <dd className="font-medium">{project.role}</dd>
          </>
        )}
        <dt className="text-[#8a8780]">기술</dt>
        <dd>{project.tech.join(' · ')}</dd>
      </dl>

      {project.image && (
        <div className="relative mb-6 aspect-[16/9] w-full overflow-hidden bg-[#f4f2ee]">
          <Image src={project.image} alt={project.title} fill sizes="(min-width: 896px) 832px, 100vw" quality={80} className="object-cover" />
        </div>
      )}

      {project.video && (
        <video src={project.video} controls preload="none" playsInline className="mb-6 w-full border border-[#111]/10 bg-black" />
      )}

      <p className="mb-5 break-keep text-base leading-loose text-[#3a3834]">{project.impactLine ?? project.description}</p>
      {project.detailedDescription && <p className="mb-5 break-keep text-[15px] leading-loose text-[#6b6862]">{project.detailedDescription}</p>}

      {project.keyResult && project.keyResult.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium tracking-[0.25em] text-[#8a8780]">핵심 성과</p>
          <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#3a3834] marker:text-[#8a8780]">
            {project.keyResult.map((r, i) => (
              <li key={i} className="break-keep">{r}</li>
            ))}
          </ul>
        </div>
      )}

      {studies.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-xs font-medium tracking-[0.25em] text-[#8a8780]">트러블슈팅</p>
          <ul className="list-disc space-y-1.5 pl-5 text-[15px] leading-relaxed text-[#3a3834] marker:text-[#8a8780]">
            {studies.map((s, i) => (
              <li key={i} className="break-keep">{s.title}</li>
            ))}
          </ul>
        </div>
      )}

      {links.length > 0 && (
        <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
          {links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/40 pb-0.5 hover:border-[#111]">
              {l.label} ↗
            </a>
          ))}
        </p>
      )}
    </article>
  );
}

export default function SimplePage() {
  const { contact, skills, experience } = portfolioData;
  const projects = portfolioData.projects as Project[];

  return (
    <div className="min-h-screen bg-white text-[#111]">
      {/* 상단 바 */}
      <header className="sticky top-0 z-30 border-b border-[#111]/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-sm font-medium tracking-[0.2em]">kkaemong</Link>
          <nav className="flex items-center gap-5 text-[13px] font-medium tracking-[0.1em] text-[#6b6862]">
            <a href="#skills" className="hover:text-[#111]">기술</a>
            <a href="#projects" className="hover:text-[#111]">프로젝트</a>
            <a href="#experience" className="hover:text-[#111]">경력</a>
            <a href="#contact" className="hover:text-[#111]">연락처</a>
            <Link href="/interactive" className="hidden border-b border-[#111]/30 pb-0.5 text-[#111] hover:border-[#111] sm:inline">인터랙티브 버전 ↗</Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 pb-24 pt-16 sm:pt-24">
        {/* 소개 */}
        <section className="mb-20">
          <Image src="/profile.jpg" alt="진준영" width={96} height={96} className="mb-6 h-24 w-24 rounded-full object-cover object-top" priority />
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-[#8a8780]">Game Client Developer</p>
          <h1 className={`mb-6 text-5xl font-light leading-[1.15] tracking-tight sm:text-7xl ${SERIF}`}>진준영</h1>
          <p className={`mb-8 break-keep text-xl font-light leading-relaxed text-[#3a3834] sm:text-2xl ${SERIF}`}>증상이 아니라 원인을 찾습니다.</p>
          <p className="mb-8 max-w-2xl break-keep text-base leading-loose text-[#6b6862]">{contact.message}</p>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <a href={`mailto:${contact.email}`} className="border-b border-[#111]/40 pb-0.5 hover:border-[#111]">{contact.email}</a>
            <a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/40 pb-0.5 hover:border-[#111]">GitHub ↗</a>
            <a href={contact.blog} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/40 pb-0.5 hover:border-[#111]">Velog ↗</a>
          </p>
        </section>

        {/* 기술 */}
        <section className="mb-20">
          <SectionTitle id="skills">기술</SectionTitle>
          <div className="space-y-8">
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#8a8780]">주력</p>
              <ul className="space-y-4">
                {skills.main.map((s) => (
                  <li key={s.name}>
                    <p className={`text-2xl font-light ${SERIF}`}>{s.name}</p>
                    <p className="break-keep text-[15px] leading-relaxed text-[#6b6862]">{s.description}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.3em] text-[#8a8780]">보조</p>
              <ul className="space-y-3">
                {skills.sub.map((s) => (
                  <li key={s.name} className="text-[15px] leading-relaxed">
                    <span className="mr-3 font-medium">{s.name}</span>
                    <span className="break-keep text-[#6b6862]">{s.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 프로젝트 */}
        <section className="mb-20">
          <SectionTitle id="projects">프로젝트</SectionTitle>
          <div className="space-y-14">
            {projects.map((p, i) => (
              <ProjectBlock key={p.id} project={p} index={i} />
            ))}
          </div>
        </section>

        {/* 경력 및 학력 */}
        <section className="mb-20">
          <SectionTitle id="experience">경력 및 학력</SectionTitle>
          <ul className="divide-y divide-[#111]/10">
            {experience.map((e) => (
              <li key={e.id} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
                <span className="text-sm tracking-wide text-[#8a8780]">{e.period}</span>
                <div>
                  <p className="text-base font-medium">{e.title}</p>
                  <p className="break-keep text-[15px] leading-relaxed text-[#6b6862]">{e.content}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* 연락처 */}
        <section>
          <SectionTitle id="contact">연락처</SectionTitle>
          <ul className="space-y-2 text-base">
            <li><span className="mr-4 inline-block w-20 text-sm text-[#8a8780]">이메일</span><a href={`mailto:${contact.email}`} className="border-b border-[#111]/30 hover:border-[#111]">{contact.email}</a></li>
            <li><span className="mr-4 inline-block w-20 text-sm text-[#8a8780]">GitHub</span><a href={`https://${contact.github}`} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/30 hover:border-[#111]">{contact.github}</a></li>
            <li><span className="mr-4 inline-block w-20 text-sm text-[#8a8780]">블로그</span><a href={contact.blog} target="_blank" rel="noopener noreferrer" className="border-b border-[#111]/30 hover:border-[#111]">{hostName(contact.blog)}</a></li>
          </ul>
        </section>
      </main>
    </div>
  );
}
