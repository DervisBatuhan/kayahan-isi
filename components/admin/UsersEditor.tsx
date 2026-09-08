"use client";

import { useState, useTransition } from "react";
import {
  createUser,
  deleteUser,
  resetUserPassword,
  updateUserRole,
} from "@/app/admin/(panel)/users/actions";
import { Field, Select, TextInput } from "./fields";

type UserRow = { id: string; name: string; email: string; role: string; createdAt: string };

export function UsersEditor({ users, currentUid }: { users: UserRow[]; currentUid: string }) {
  return (
    <div className="space-y-5">
      <CreateUserCard />
      <div className="overflow-hidden rounded-[6px] border border-line bg-white">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-surface-muted text-[11px] uppercase tracking-wide text-ink-400">
            <tr>
              <th className="px-4 py-2 font-semibold">Ad</th>
              <th className="px-4 py-2 font-semibold">E-posta</th>
              <th className="px-4 py-2 font-semibold">Rol</th>
              <th className="px-4 py-2 font-semibold" />
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {users.map((u) => (
              <UserRowItem key={u.id} user={u} isSelf={u.id === currentUid} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CreateUserCard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("editor");
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<{ ok: boolean; message: string } | null>(null);

  function handleCreate() {
    startTransition(async () => {
      const res = await createUser({ name, email, password, role });
      if (res.ok) {
        setStatus({ ok: true, message: "Kullanıcı oluşturuldu." });
        setName("");
        setEmail("");
        setPassword("");
        setRole("editor");
      } else {
        setStatus({ ok: false, message: res.error });
      }
    });
  }

  return (
    <div className="rounded-[6px] border border-line bg-white p-5">
      <h2 className="text-[14px] font-bold text-ink-900">Yeni kullanıcı</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Field label="Ad Soyad">
          <TextInput value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="E-posta">
          <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <Field label="Şifre" hint="En az 8 karakter.">
          <TextInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Field>
        <Field label="Rol">
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="editor">Editör</option>
            <option value="admin">Yönetici</option>
          </Select>
        </Field>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={handleCreate}
          disabled={pending}
          className="rounded-[4px] bg-brand-500 px-4 py-2 text-[12.5px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:opacity-60"
        >
          {pending ? "Oluşturuluyor…" : "Kullanıcı oluştur"}
        </button>
        {status && (
          <span className={status.ok ? "text-[12.5px] font-semibold text-brand-600" : "text-[12.5px] font-semibold text-danger-600"}>
            {status.message}
          </span>
        )}
      </div>
    </div>
  );
}

function UserRowItem({ user, isSelf }: { user: UserRow; isSelf: boolean }) {
  const [role, setRole] = useState(user.role);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<string | null>(null);

  function handleRoleChange(next: string) {
    setRole(next);
    startTransition(async () => {
      const res = await updateUserRole(user.id, next);
      setStatus(res.ok ? "Rol güncellendi." : res.error);
      if (!res.ok) setRole(user.role);
    });
  }

  function handleResetPassword() {
    const password = prompt(`${user.name} için yeni şifre (en az 8 karakter):`);
    if (!password) return;
    startTransition(async () => {
      const res = await resetUserPassword(user.id, password);
      setStatus(res.ok ? "Şifre sıfırlandı." : res.error);
    });
  }

  function handleDelete() {
    if (!confirm(`${user.name} kullanıcısını silmek istediğine emin misin?`)) return;
    startTransition(async () => {
      const res = await deleteUser(user.id);
      setStatus(res.ok ? null : res.error);
    });
  }

  return (
    <tr className="hover:bg-surface-blue/40">
      <td className="px-4 py-2.5 font-medium text-ink-800">
        {user.name}
        {isSelf && <span className="ml-1.5 text-[11px] font-normal text-ink-400">(sen)</span>}
      </td>
      <td className="px-4 py-2.5 text-ink-600">{user.email}</td>
      <td className="px-4 py-2.5">
        <Select
          value={role}
          disabled={isSelf || pending}
          onChange={(e) => handleRoleChange(e.target.value)}
          className="!w-auto py-1"
        >
          <option value="editor">Editör</option>
          <option value="admin">Yönetici</option>
        </Select>
      </td>
      <td className="px-4 py-2.5 text-right">
        <div className="flex items-center justify-end gap-3">
          {status && <span className="text-[11px] text-ink-400">{status}</span>}
          <button
            type="button"
            onClick={handleResetPassword}
            disabled={pending}
            className="text-[12px] font-semibold text-brand-600 hover:underline disabled:opacity-60"
          >
            Şifre sıfırla
          </button>
          {!isSelf && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending}
              className="text-[12px] font-semibold text-danger-600 hover:underline disabled:opacity-60"
            >
              Sil
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}
