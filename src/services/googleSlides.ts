export interface SlideContent {
  title: string;
  subtitle?: string;
  category: string;
  bullets: string[];
  notes?: string;
}

export interface ExportResult {
  presentationId: string;
  presentationUrl: string;
  title: string;
}

export async function createGoogleSlidesPresentation(
  title: string,
  slides: SlideContent[],
  accessToken: string,
  onProgress?: (step: string, percentage: number) => void
): Promise<ExportResult> {
  onProgress?.('الاتصال بخدمة Google Slides وإنشاء المستند...', 10);

  // 1. Create the presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
    }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    const message =
      errorData?.error?.message ||
      `تعذر إنشاء الملف على Google Slides (${createRes.status} ${createRes.statusText})`;
    throw new Error(message);
  }

  const presentation = await createRes.json();
  const presentationId = presentation.presentationId;
  const presentationUrl = `https://docs.google.com/presentation/d/${presentationId}/edit`;
  const firstSlideId = presentation.slides?.[0]?.objectId;

  onProgress?.('تجهيز شرائح الدراسة التسويقية والتنسيقات...', 30);

  // 2. Build atomic batch update requests
  const requests: any[] = [];

  // For each slide, create a BLANK slide and text boxes for title & body
  slides.forEach((slide, index) => {
    const slideId = `slide_deck_${index + 1}`;
    const titleBoxId = `title_box_${index + 1}`;
    const bodyBoxId = `body_box_${index + 1}`;

    // A) Create blank slide
    requests.push({
      createSlide: {
        objectId: slideId,
        insertionIndex: index,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // B) Title Text Box (Top of slide)
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            height: { magnitude: 70, unit: 'PT' },
            width: { magnitude: 640, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 40,
            translateY: 25,
            unit: 'PT',
          },
        },
      },
    });

    // C) Insert Title Text
    const fullTitleText =
      index === 0
        ? `${slide.title}\n[${slide.category}]`
        : `${index + 1}. ${slide.title}\n[يلا فيكس | ${slide.category}]`;

    requests.push({
      insertText: {
        objectId: titleBoxId,
        text: fullTitleText,
      },
    });

    // D) Body Text Box (Middle to bottom)
    requests.push({
      createShape: {
        objectId: bodyBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideId,
          size: {
            height: { magnitude: 270, unit: 'PT' },
            width: { magnitude: 640, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 40,
            translateY: 105,
            unit: 'PT',
          },
        },
      },
    });

    // E) Insert Bullets & Content
    const bulletText = slide.bullets.map((b) => `• ${b}`).join('\n\n');
    const fullBodyText = slide.subtitle
      ? `« ${slide.subtitle} »\n\n${bulletText}`
      : bulletText;

    requests.push({
      insertText: {
        objectId: bodyBoxId,
        text: fullBodyText,
      },
    });
  });

  // F) Delete the initial default empty template slide after our slides are added
  if (firstSlideId) {
    requests.push({
      deleteObject: {
        objectId: firstSlideId,
      },
    });
  }

  onProgress?.('إرسال الشرائح إلى Google Drive و Google Slides...', 70);

  // 3. Execute batchUpdate
  const batchRes = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!batchRes.ok) {
    const errorData = await batchRes.json().catch(() => ({}));
    console.error('Google Slides batchUpdate error details:', errorData);
    const errMessage =
      errorData?.error?.message ||
      `فشل إدراج محتوى الشرائح (${batchRes.status} ${batchRes.statusText})`;
    throw new Error(errMessage);
  }

  onProgress?.('تم تصدير وحفظ العرض التقديمي بنجاح!', 100);

  return {
    presentationId,
    presentationUrl,
    title,
  };
}
