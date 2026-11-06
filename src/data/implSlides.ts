// 프로젝트별 "구현" 슬라이드: 큰 소제목 → 구현 사항(최대 3줄) → 코드 발췌(로그·null 체크 생략) → 필요한 곳만 이미지/영상.
// 코드는 실제 저장소 파일에서 줄여 온 것이다. 확인되지 않은 원인·증상은 쓰지 않는다.
export type ImplCode = {
  filename: string;
  code: string;
  hl?: number[]; // 강조할 줄(1부터)
  // 코드 블록 오른쪽 아래에 겹쳐 보여 줄 작은 조각(캡처 이미지 src 또는 짧은 코드)
  inset?: { src?: string; code?: string; alt?: string };
};

// group이 같은 연속 항목은 strip 안에서 2열로 묶어(위아래로) 한 칸에 보여 준다
// state: 이 사진에서 시작되는 enum 상태 이름(사진 밑에 작게 표시)
// ok: 비교 사진에서 성공(true)·실패(false) 표시
export type ImplMedia = { src: string; caption?: string; kind?: 'image' | 'video'; group?: number; state?: string; ok?: boolean };

export type ImplSlideData = {
  title: string;
  lines: string[];
  codes: ImplCode[];
  leftCode?: ImplCode; // 구현 사항 아래(왼쪽)에 보여 줄 짧은 코드
  leftImage?: { src: string; caption?: string }; // 구현 사항 아래(왼쪽)에 보여 줄 캡처 이미지(예: enum 정의)
  media?: ImplMedia[]; // 스샷/GIF가 준비되면 채운다(없으면 표시하지 않음)
  strip?: boolean; // true면 media를 순서가 있는 한 줄 흐름(번호·화살표)으로 보여 준다
  pairs?: { title: string; items: ImplMedia[]; code: ImplCode }[]; // 사진 묶음 바로 아래에 해당 코드를 붙여 보여 주는 짝(사진 → 코드)
  // 판정 순서 플로차트: 각 단계의 거절 조건과, 직접 구현한 판정 표시(mine)
  flow?: { steps: { label: string; reject?: string; mine?: boolean }[]; result: string; note?: string };
  table?: { head: [string, string]; rows: [string, string][] }; // 구현 사항 아래에 보여 줄 작은 2열 표
  compareTitle?: string; // 비교 사진 묶음 위에 달 작은 제목(요점 한 줄)
  compare?: { title: string; items: ImplMedia[] }[]; // 성공/실패를 나란히 비교하는 사진 묶음(✓/✕ 표시)
};

export const IMPL_SLIDES: Record<string, ImplSlideData[]> = {
  gifted: [
    {
      title: '상자 상태 전이 시스템',
      strip: true,
      media: [
        { src: '/Gifted/주문서.png', caption: '주문서' },
        { src: '/Gifted/빈상자.png', caption: '빈 상자', state: 'EmptyOpened' },
        { src: '/Gifted/선물.png', caption: '선물', group: 1, state: 'ClosedWithGift' },
        { src: '/Gifted/포장지.png', caption: '포장지', group: 1 },
        { src: '/Gifted/포장.png', caption: '포장', state: 'Wrapped' },
        { src: '/Gifted/리본작업.gif', caption: '리본 작업(R 홀드)' },
        { src: '/Gifted/완성.png', caption: '완성', state: 'Finished' },
        { src: '/Gifted/제출전.png', caption: '썰매 제출 전' },
        { src: '/Gifted/제출후.png', caption: '썰매 제출 후', state: 'Submitted' },
      ],
      lines: [
        '상태 5개(빈 상자 → 선물 → 포장 → 완성 → 제출)를 enum으로 정의',
        'InsertGift가 아이템 종류 × 현재 상태로 수령 여부와 전이를 결정하고, 리본 작업(R 홀드)이 끝나면 Finish()가 포장 → 완성으로 전이',
        '포장지는 상자별 허용 그룹과 일치할 때만 수령',
      ],
      codes: [
        {
          filename: 'BoxStateController.cs · InsertGift / Finish 발췌 (로그 생략)',
          hl: [5, 7, 15, 17],
          // BoxState enum: 직접 캡처한 이미지를 쓰려면 아래 줄을 inset: { src: '/Gifted/enum.png', alt: 'BoxState enum' } 로 바꾼다
          inset: {
            code: `public enum BoxState
{
    EmptyOpened,
    ClosedWithGift,
    Wrapped,
    Finished,
    Submitted
}`,
          },
          code: `if (identifier.ItemType == BoxItemType.WrappingPaper)
{
    if (boxData.state == BoxState.ClosedWithGift)
    {
        if (identifier.wrappingGroup != allowedWrappingGroup) return false;
        Destroy(gift);
        SetWrappedDesign(identifier.designIndex);   // → Wrapped
        return true;
    }
    return false;
}
// 리본 작업(R 홀드)이 끝나면 호출 — 홀드 입력은 팀원 구현
public bool Finish()
{
    if (!CanFinish) return false;   // Wrapped일 때만
    boxData.finishDesignIndex = boxData.designIndex;
    SetState(BoxState.Finished);    // → Finished
    return true;
}`,
        },
      ],
    },
    {
      title: '어항 → 아이스박스 수령 체인',
      lines: [
        '팀 IItemReceiver 위에 물 → 물고기 → 아이스박스 순서로만 받도록 구현',
        '완성된 어항(IsComplete)만 아이스박스가 받아 닫힌 프리팹으로 교체',
      ],
      pairs: [
        {
          title: '어항에 물고기 넣기',
          items: [
            { src: '/Gifted/물없는어항에물고기.png', caption: '물 없는 어항', ok: false },
            { src: '/Gifted/물있는어항에물고기.png', caption: '물 있는 어항', ok: true },
          ],
          code: {
            filename: 'FishBowlController.cs · CanReceiveItem 발췌',
            hl: [2],
            code: `if (!hasWater && identifier.ItemType == BoxItemType.Water) return true;
if (hasWater && !hasFish && (identifier.ItemType == BoxItemType.Fish1 || identifier.ItemType == BoxItemType.Fish2)) return true;  // 물 있어야 물고기 넣기 가능`,
          },
        },
        {
          title: '아이스박스에 어항 넣기',
          items: [
            { src: '/Gifted/아이스박스 성공포장.png', caption: '물 + 물고기가 찬 어항', ok: true },
            { src: '/Gifted/아이스박스 실패 1.png', caption: '물만 있는 어항', ok: false },
            { src: '/Gifted/아이스박스 실패 2.png', caption: '빈 어항', ok: false },
          ],
          code: {
            filename: 'IceCoolerController.cs · CanReceiveItem 발췌 (아이스박스 전용)',
            hl: [2],
            code: `// 물 + 물고기가 모두 있는 어항만 수령
if (bowl == null || !bowl.IsComplete)
{
    return false;
}
return true;`,
          },
        },
      ],
      codes: [],
    },
    {
      title: '썰매 제출 판정',
      lines: [
        '완성된 상자만 수령: 상자 종류에 따라 요구 상태 기준(required)을 다르게 계산',
        '상자 데이터를 주문 쪽 enum으로 변환해 활성 주문과 대조',
        '제출된 상자는 Submitted로 잠가 중복 제출을 거절',
      ],
      table: {
        head: ['상자 종류', '수령 기준'],
        rows: [
          ['일반 상자', 'Finished 이상 (선물 → 포장 → 리본 완료)'],
          ['어항 · 아이스박스', 'ClosedWithGift 이상 (포장·리본 단계가 없어서 담기면 완성)'],
        ],
      },
      flow: {
        steps: [
          { label: '상자인지 확인', mine: true },
          { label: '제출 전 상자인지 확인', mine: true },
          { label: '완성된 상자인지 확인', mine: true },
          { label: '주문서와 일치하는지 확인', mine: true },
        ],
        result: '썰매에 적재 (LoadBox)',
      },
      codes: [
        {
          filename: 'SleighController.cs · CanReceiveItem 발췌 (기준 상태 계산)',
          hl: [2],
          code: `bool isNoWrapBox = box.AllowedWrappingGroup == WrappingGroup.IceBox || box.AllowedWrappingGroup == WrappingGroup.Fishbowl;
BoxStateController.BoxState required = isNoWrapBox ? BoxStateController.BoxState.ClosedWithGift : minRequiredState;`,
        },
        {
          filename: 'SleighController.cs · Submitted 가드 / LoadBox 잠금 발췌 (로그 생략)',
          hl: [1, 2, 3, 4, 7, 8],
          code: `if (!acceptAllStates && box.Data.state == BoxStateController.BoxState.Submitted)
{
    return false;
}

// LoadBox — 첫 줄에서 상태를 잠금
box.Data.state = BoxStateController.BoxState.Submitted;
box.gameObject.SetActive(false);`,
        },
      ],
    },
  ],
};

// 지금은 화면에 쓰지 않는 GIFTED 슬라이드(콜라이더 동기화, UV 도구). 사진·증상 확인이 끝나면 위 gifted 배열 끝에 다시 넣으면 된다.
export const GIFTED_SPARE_SLIDES: ImplSlideData[] = [
    {
      title: '상태별 콜라이더 동기화',
      lines: [
        '상태가 바뀌면 활성 모델의 콜라이더 크기·중심을 상자 본체(BoxCollider)에 복사',
        '크기 변화로 생기는 바닥 높이 차이를 계산해 위치를 보정하고, Physics.SyncTransforms로 즉시 반영',
      ],
      // 보정 전/후 스샷이 준비되면 아래 두 번째 짝(바닥 보정)의 items에 넣는다. 예:
      // { src: '/Gifted/콜라이더-보정없음.png', caption: '보정 없음', ok: false },
      // { src: '/Gifted/콜라이더-보정적용.png', caption: '보정 적용', ok: true },
      pairs: [
        {
          title: '크기 복사',
          items: [],
          code: {
            filename: 'BoxStateController.cs · SyncMainColliderWithVisual 발췌',
            hl: [1, 4],
            code: `mainCol.center = transform.InverseTransformPoint(
    activeChildCol.transform.TransformPoint(activeChildCol.center));
Vector3 worldSize = Vector3.Scale(activeChildCol.size, activeChildCol.transform.lossyScale);
mainCol.size = new Vector3(
    worldSize.x / transform.lossyScale.x,
    worldSize.y / transform.lossyScale.y,
    worldSize.z / transform.lossyScale.z
);`,
          },
        },
        {
          title: '바닥 보정',
          items: [],
          code: {
            filename: 'BoxStateController.cs · SyncMainColliderWithVisual 발췌 (일부 생략)',
            hl: [5, 7, 10],
            code: `float oldBottomY = mainCol.bounds.min.y;   // 크기 복사 전의 바닥 높이
// ... 위의 크기 복사 ...
if (Application.isPlaying && transform.parent == null && wasEnabled)
{
    Physics.SyncTransforms();   // 콜라이더 변경을 물리 엔진에 즉시 반영
    float newBottomY = mainCol.bounds.min.y;
    float diff = oldBottomY - newBottomY;
    if (Mathf.Abs(diff) > 0.001f)
    {
        transform.position += Vector3.up * diff;
        Physics.SyncTransforms();
    }
}`,
          },
        },
      ],
      codes: [],
    },
    {
      title: 'UV 보정 에디터 도구',
      lines: [
        'UV가 없는 포장지 모델을 정점 좌표 평면 투사로 UV를 만들어 주는 메뉴(MeshFilter 우클릭)',
        '원본 메시는 두고 복사본을 새 에셋으로 저장하고, 메시 교체는 Undo로 기록',
      ],
      codes: [
        {
          filename: 'MeshUVFixerTool.cs · FixUVAndSave 발췌',
          hl: [6, 9],
          code: `[MenuItem("CONTEXT/MeshFilter/Fix UV and Save as Asset")]
private static void FixUVAndSave(MenuCommand command)
{
    Mesh newMesh = Object.Instantiate(originalMesh);          // 원본은 두고 복사본에 작업
    for (int i = 0; i < vertices.Length; i++)
        uvs[i] = new Vector2(vertices[i].x, vertices[i].y);   // 정점 (x, y)를 UV로: 단순 평면 투사
    newMesh.uv = uvs;
    AssetDatabase.CreateAsset(newMesh, AssetDatabase.GenerateUniqueAssetPath(newPath));
    Undo.RecordObject(mf, "Fix UV and Swap Mesh");
    mf.sharedMesh = newMesh;                                  // 메시 교체는 Undo로 기록
}`,
        },
      ],
    },
];
