const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-6 py-2 text-xs font-medium text-gray-400 uppercase">
      {children}
    </div>
  );
};

export default SectionTitle;
