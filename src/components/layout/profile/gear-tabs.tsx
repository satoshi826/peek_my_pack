'use client'

import Link from 'next/link'
import { Camera, Aperture } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Typography } from '@/components/ui_shadcn/typography'
import { Flex, Grid } from '@/components/ui_shadcn/layout'
import type { UserGearWithDetails } from '@/repositories/user-gear.repository'

interface GearTabsProps {
  ownedGears: UserGearWithDetails[]
  wantedGears: UserGearWithDetails[]
  previouslyOwnedGears: UserGearWithDetails[]
}

function GearSection({ icon, label, gears }: { icon: React.ReactNode, label: string, gears: UserGearWithDetails[] }) {
  if (gears.length === 0) return null

  return (
    <Card variant="inset" className="p-6">
      <Flex align="center" gap={2}>
        {icon}
        <Typography variant="h3">{label}</Typography>
      </Flex>
      <Grid gap={6} mdCols={2}>
        {gears.map(gear => (
          <Card key={gear.id} className="block p-4 hover:bg-accent transition-colors">
            <Link href={`/gears/${gear.id}`}>
              <div>
                <Typography>{gear.masterName || gear.customName}</Typography>
                <Typography variant="muted">
                  {gear.makerName || '不明なメーカー'}
                </Typography>
                {gear.comment && <Typography variant="muted" className="mt-2">{gear.comment}</Typography>}
              </div>
            </Link>
          </Card>
        ))}
      </Grid>
    </Card>
  )
}

function GearList({ gears, emptyMessage }: { gears: UserGearWithDetails[], emptyMessage: string }) {
  const cameras = gears.filter(g => g.gearType === 'camera')
  const lenses = gears.filter(g => g.gearType === 'lens')

  if (cameras.length === 0 && lenses.length === 0) {
    return <Typography variant="muted" className="text-center py-8">{emptyMessage}</Typography>
  }

  return (
    <div className="space-y-8">
      <GearSection icon={<Camera className="h-5 w-5 text-zinc-600" />} label="カメラ" gears={cameras} />
      <GearSection icon={<Aperture className="h-5 w-5 text-zinc-600" />} label="レンズ" gears={lenses} />
    </div>
  )
}

export function GearTabs({ ownedGears, wantedGears, previouslyOwnedGears }: GearTabsProps) {
  return (
    <Tabs defaultValue="owned">
      <TabsList>
        <TabsTrigger value="owned">もってる</TabsTrigger>
        <TabsTrigger value="wanted">ほしい</TabsTrigger>
        <TabsTrigger value="previously-owned">もってた</TabsTrigger>
      </TabsList>
      <TabsContent value="owned">
        <GearList gears={ownedGears} emptyMessage="所有ギアがありません" />
      </TabsContent>
      <TabsContent value="wanted">
        <GearList gears={wantedGears} emptyMessage="ほしいギアがありません" />
      </TabsContent>
      <TabsContent value="previously-owned">
        <GearList gears={previouslyOwnedGears} emptyMessage="以前所有していたギアがありません" />
      </TabsContent>
    </Tabs>
  )
}
