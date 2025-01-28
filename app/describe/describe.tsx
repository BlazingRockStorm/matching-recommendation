import { useState, type FormEvent } from 'react';
import { fetchGeminiData } from '~/utils/gemini';
import ReactMarkdown from 'react-markdown';

export function Describe() {
  const [maleInfo, setMaleInfo] = useState('');
  const [femaleInfo, setFemaleInfo] = useState('');
  const [result, setResult] = useState<any>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await fetchGeminiData(maleInfo, femaleInfo);
      setResult('Dựa trên thông tin của cả hai, đây là kết quả tư vấn:\n\n'+data);
    } catch (error) {
      console.error('Error:', error);
      setResult('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setIsLoading(false);
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
            disabled={isLoading}
            className="border px-8 py-2 rounded-md disabled:opacity-50">
            {isLoading ? 'Đang xử lý...' : 'Bắt đầu tư vấn'}
          </button>
        </div>
      </form>

      {isLoading && (
        <div className="mt-6 text-center">
          <p>Đang xử lý thông tin...</p>
        </div>
      )}

      {!isLoading && result && (
        <div className="mt-6 p-4 border rounded-md display-linebreak">
          <ReactMarkdown>{result}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}