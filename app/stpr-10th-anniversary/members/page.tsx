import PageContainer from "@/components/common/PageContainer"
import MemberCard from "@/components/members/MemberCard"
import { MEMBERS } from "@/data/members"

export default function MembersPage() {
  return (
    <PageContainer subtitle="MEMBERS" title="メンバー">
      {/* PC 2列 / SP 3列 */}
      <div className="grid grid-cols-3 gap-3 sm:gap-5 md:grid-cols-2">
        {MEMBERS.map((m) => (
          <MemberCard key={m.id} member={m} />
        ))}
      </div>
    </PageContainer>
  )
}
