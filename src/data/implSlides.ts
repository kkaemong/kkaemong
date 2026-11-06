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
export type ImplMedia = { src: string; caption?: string; kind?: 'image' | 'video'; group?: number; state?: string };

export type ImplSlideData = {
  title: string;
  lines: string[];
  codes: ImplCode[];
  leftCode?: ImplCode; // 구현 사항 아래(왼쪽)에 보여 줄 짧은 코드
  leftImage?: { src: string; caption?: string }; // 구현 사항 아래(왼쪽)에 보여 줄 캡처 이미지(예: enum 정의)
  media?: ImplMedia[]; // 스샷/GIF가 준비되면 채운다(없으면 표시하지 않음)
  strip?: boolean; // true면 media를 순서가 있는 한 줄 흐름(번호·화살표)으로 보여 준다
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
        { src: '/Gifted/리본작업.gif', caption: '리본 작업' },
        { src: '/Gifted/완성.png', caption: '완성', state: 'Finished' },
        { src: '/Gifted/제출전.png', caption: '썰매 제출 전' },
        { src: '/Gifted/제출후.png', caption: '썰매 제출 후', state: 'Submitted' },
      ],
      lines: [
        '빈 상자 → 선물 든 상자 → 포장 → 완성 → 제출, 5개 상태를 enum으로 정의',
        'InsertGift 한 곳에서 아이템 종류 × 현재 상태로 전이를 판단하고, 리본은 포장 → 완성 전이를 일으키는 동작으로 처리',
        '포장지는 상자별 허용 그룹과 일치할 때만 수령',
      ],
      codes: [
        {
          filename: 'BoxStateController.cs · InsertGift 발췌',
          hl: [5, 6, 13],
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
        SetWrappedDesign(identifier.designIndex);   // → Wrapped
        return true;
    }
    return false;
}
if (identifier.ItemType == BoxItemType.Ribbon)
{
    if (boxData.state == BoxState.Wrapped) { Finish(); return true; }
    return false;
}`,
        },
      ],
    },
    {
      title: '어항 → 아이스박스 → 썰매 수령 체인',
      lines: [
        '팀 공용 IItemReceiver 위에, 물 → 물고기 순서로만 받는 어항을 구현',
        '양동이는 물이 차면 아이템 타입을 Water로 바꿔 같은 수령 규칙을 재사용, 완성된 어항만 아이스박스가 받아 닫힌 프리팹으로 교체',
        '어항 주문은 아이스박스로 제출해도 정답이 되는 기획 룰을 OrderChecker에 반영',
      ],
      codes: [
        {
          filename: 'BucketController.cs · FillWater 발췌',
          hl: [4],
          code: `public void FillWater()
{
    IsFilled = true;
    identifier.ItemType = BoxItemType.Water;   // 물이 차면 아이템 타입이 Water
    waterVisual.SetActive(true);
}`,
        },
        {
          filename: 'IceCoolerController.cs · CanReceiveItem 발췌',
          hl: [2],
          code: `FishBowlController bowl = item.GetComponent<FishBowlController>();
return bowl != null && bowl.IsComplete;   // 물 + 물고기가 모두 있는 어항만 수령`,
        },
        {
          filename: 'OrderChecker.cs · 기획 룰',
          hl: [2, 3],
          code: `// 주문서가 어항이어도, 아이스박스에 담아 제출하면 정답
if (order.wrappingColor == WrappingColor.Fishbowl && result.wrappingColor == WrappingColor.Icebox)
    isWrapMatch = true;`,
        },
      ],
    },
    {
      title: '썰매 적재 중복 방지',
      lines: [
        '같은 상자가 두 번 제출되던 문제를, 제출 처리 첫 줄에서 상태를 Submitted로 바꾸고 비활성화해 막음',
        'CanReceiveItem에도 Submitted 상자를 거부하는 가드를 추가',
      ],
      codes: [
        {
          filename: 'SleighController.cs · CanReceiveItem / LoadBox 발췌',
          hl: [2, 3, 6, 7],
          code: `// CanReceiveItem — 이미 제출 처리된 상자는 거부
if (!acceptAllStates && box.Data.state == BoxStateController.BoxState.Submitted)
    return false;

// LoadBox — 첫 줄에서 상태를 잠금
box.Data.state = BoxStateController.BoxState.Submitted;
box.gameObject.SetActive(false);`,
        },
      ],
    },
    {
      title: '상태별 콜라이더 동기화',
      lines: [
        '상태마다 모델이 달라져, 활성 모델의 콜라이더 크기를 본체 콜라이더에 복사',
        '콜라이더가 바뀐 뒤 바닥 높이 차이만큼 위치를 보정하고, Physics.SyncTransforms로 즉시 반영',
      ],
      codes: [
        {
          filename: 'BoxStateController.cs · SyncMainColliderWithVisual 발췌',
          hl: [5, 8],
          code: `float oldBottomY = mainCol.bounds.min.y;
// ... 활성 모델의 콜라이더 크기·중심을 본체 BoxCollider에 복사 ...
if (Application.isPlaying && transform.parent == null && wasEnabled)
{
    Physics.SyncTransforms();                      // 바뀐 콜라이더를 물리에 즉시 반영
    float diff = oldBottomY - mainCol.bounds.min.y;
    if (Mathf.Abs(diff) > 0.001f)
        transform.position += Vector3.up * diff;   // 바닥 높이 보정
}`,
        },
      ],
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
  ],
};
