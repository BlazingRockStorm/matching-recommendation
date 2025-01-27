import { useState, type FormEvent } from 'react';
import { fetchGeminiData } from '~/utils/gemini';

export function Describe() {
  const [maleInfo, setMaleInfo] = useState('');
  const [femaleInfo, setFemaleInfo] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await fetchGeminiData(maleInfo, femaleInfo);
      setResult(`
        Dựa trên thông tin của cả hai, đây là kết quả tư vấn:&#10;
        ${data}
      `);
    } catch (error) {
      console.error('Error:', error);
      setResult('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Tư vấn hẹn hò</h1>
      <p className="mt-4">
        Tư vấn hẹn hò dựa trên thông tin của 2 bạn(sở thích, tính cách, ...).
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <textarea
            className="border p-4 w-1/2 h-32"
            placeholder="Nhập thông tin bạn nam"
            value={maleInfo}
            onChange={(e) => setMaleInfo(e.target.value)}
            required
          />

          <textarea
            className="border p-4 w-1/2 h-32"
            placeholder="Nhập thông tin bạn nữ"
            value={femaleInfo}
            onChange={(e) => setFemaleInfo(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="border px-8 py-2 rounded-md">
            Bắt đầu tư vấn
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded-md">
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}