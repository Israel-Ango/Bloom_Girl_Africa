import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const studentId = searchParams.get('id')

  if (!studentId) {
    return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
  }

  try {
    const supabase = await createAdminClient()

    const [{ data: profile }, { data: certificate }] = await Promise.all([
      supabase.from('profiles').select('full_name, country').eq('id', studentId).single(),
      supabase.from('certificates').select('*').eq('student_id', studentId).single()
    ])

    if (!profile || !certificate) {
      return NextResponse.json({ error: 'Certificate not found' }, { status: 404 })
    }

    const completionDate = new Date(certificate.issued_at).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    })

    // Generate HTML certificate for printing/PDF
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Bloom Girl Africa Certificate — ${profile.full_name}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Inter', Arial, sans-serif; background: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
    .cert { width: 842px; min-height: 595px; border: 6px double #7C3AED; border-radius: 16px; padding: 48px; position: relative; background: #fff; }
    .cert::before { content: ''; position: absolute; inset: 10px; border: 2px solid #F59E0B; border-radius: 10px; opacity: 0.4; pointer-events: none; }
    .header { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px; }
    .logo { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, #7C3AED, #EC4899); display: flex; align-items: center; justify-content: center; color: white; font-weight: 900; font-size: 18px; }
    .brand h1 { font-size: 20px; font-weight: 900; color: #4C1D95; }
    .brand p { font-size: 11px; color: #6B7280; }
    .divider { display: flex; align-items: center; gap: 12px; margin: 16px 0; }
    .divider-line { flex: 1; height: 1px; background: linear-gradient(to right, transparent, #F59E0B, transparent); }
    .divider-star { color: #F59E0B; font-size: 18px; }
    .subtitle { text-align: center; font-size: 11px; color: #9CA3AF; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
    .cert-type { text-align: center; font-size: 26px; font-weight: 900; color: #4C1D95; margin-bottom: 16px; letter-spacing: -0.5px; }
    .presented { text-align: center; font-size: 13px; color: #6B7280; margin-bottom: 8px; }
    .name { text-align: center; font-size: 42px; font-weight: 900; color: #4C1D95; font-family: Georgia, serif; margin-bottom: 16px; }
    .description { text-align: center; max-width: 520px; margin: 0 auto 24px; font-size: 14px; color: #374151; line-height: 1.6; }
    .footer { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: end; margin-top: 24px; }
    .footer-col { text-align: center; }
    .footer-line { height: 1px; background: #D1D5DB; margin-bottom: 6px; }
    .footer-label { font-size: 10px; color: #9CA3AF; }
    .footer-value { font-size: 12px; font-weight: 600; color: #374151; }
    .seal { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #7C3AED, #EC4899); display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto; box-shadow: 0 4px 12px rgba(124,58,237,0.3); }
    .tagline { text-align: center; font-size: 10px; color: #9CA3AF; margin-top: 16px; font-style: italic; }
    @media print { body { min-height: auto; } .cert { page-break-inside: avoid; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="header">
      <img src="/logo.png" alt="Bloom Girl Africa" style="width:56px;height:56px;border-radius:50%;object-fit:cover;" />
      <div class="brand">
        <h1>Bloom Girl Africa</h1>
        <p>SDG Learning Platform</p>
      </div>
    </div>
    <div class="divider"><div class="divider-line"></div><div class="divider-star">✦</div><div class="divider-line"></div></div>
    <p class="subtitle">Certificate of Completion</p>
    <p class="cert-type">Certificate of Achievement</p>
    <p class="presented">This is to certify that</p>
    <h2 class="name">${profile.full_name}</h2>
    <p class="description">
      has successfully completed the <strong>Bloom Girl Africa SDG Learning Program</strong>,
      demonstrating mastery of all <strong>17 United Nations Sustainable Development Goals</strong>
      and a commitment to empowering communities across Africa.
    </p>
    <div class="divider"><div class="divider-line"></div><div class="divider-star">✦</div><div class="divider-line"></div></div>
    <div class="footer">
      <div class="footer-col">
        <div class="footer-line"></div>
        <p class="footer-label">Completion Date</p>
        <p class="footer-value">${completionDate}</p>
      </div>
      <div class="footer-col">
        <div class="seal">🌸</div>
      </div>
      <div class="footer-col">
        <div class="footer-line"></div>
        <p class="footer-label">Certificate ID</p>
        <p class="footer-value">${certificate.certificate_number}</p>
      </div>
    </div>
    <p class="tagline">"Empowering Girls Through Knowledge, Leadership, and the SDGs."</p>
  </div>
  <script>window.onload = () => window.print()</script>
</body>
</html>`

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate certificate' }, { status: 500 })
  }
}
