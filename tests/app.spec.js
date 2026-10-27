import { test, expect } from '@playwright/test';

test('seis componentes funcionam juntos e o layout cabe na tela', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Seu próximo passo começa aqui.' })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(3);

  await expect(page.getByRole('button', { name: 'Página anterior', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Página 2', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Página 2', exact: true })).toHaveAttribute('aria-current', 'page');
  await expect(page.getByRole('heading', { name: 'JavaScript na prática' })).toBeVisible();
  await page.getByRole('button', { name: 'Próxima página', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Próxima página', exact: true })).toBeDisabled();

  await page.getByRole('button', { name: 'Filtrar por categoria' }).click();
  await page.getByRole('menuitemradio', { name: 'Design', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Filtrar por categoria' })).toHaveAttribute('aria-expanded', 'false');

  await page.getByRole('tab', { name: 'Concluídos' }).click();
  await expect(page.getByText('Nenhum curso concluído por aqui.')).toBeVisible();
  await page.getByRole('tab', { name: 'Em andamento' }).click();

  await page.getByRole('button', { name: 'Como funciona o meu progresso?' }).click();
  await expect(page.getByRole('button', { name: 'Como funciona o meu progresso?' })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Preciso seguir uma ordem nos cursos?' }).click();
  await expect(page.getByRole('button', { name: 'Como funciona o meu progresso?' })).toHaveAttribute('aria-expanded', 'false');

  const progress = page.getByRole('progressbar', { name: 'Progresso em Fundamentos de React' });
  await expect(progress).toHaveAttribute('aria-valuenow', '50');
  await page.getByRole('button', { name: 'Concluir próxima aula' }).click();
  await expect(progress).toHaveAttribute('aria-valuenow', '58');
  await expect(page.getByRole('status')).toContainText('Aula concluída');
  await page.getByRole('button', { name: 'Fechar notificação' }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByRole('button', { name: 'Concluir próxima aula' }).click();
  await expect(page.getByRole('status')).toBeEmpty({ timeout: 7000 });

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('menu e abas aceitam teclado, clique fora fecha o menu', async ({ page }) => {
  await page.goto('/');
  const filter = page.getByRole('button', { name: 'Filtrar por categoria' });
  await filter.focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitemradio').first()).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await expect(page.getByRole('menuitemradio', { name: 'Desenvolvimento', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(filter).toBeFocused();
  await expect(filter).toHaveAttribute('aria-expanded', 'false');
  await filter.click();
  await page.getByRole('heading', { name: 'Meus cursos' }).click();
  await expect(filter).toHaveAttribute('aria-expanded', 'false');

  await page.getByRole('tab', { name: 'Em andamento' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Concluídos' })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'Em andamento' })).toBeFocused();
});

test('concluir todas as aulas atualiza os componentes pelo contexto', async ({ page }) => {
  await page.goto('/');
  for (let lesson = 0; lesson < 6; lesson += 1) {
    await page.getByRole('button', { name: 'Concluir próxima aula' }).click();
  }
  await expect(page.getByRole('progressbar', { name: 'Progresso em Fundamentos de React' })).toHaveAttribute('aria-valuenow', '100');
  await expect(page.getByRole('button', { name: 'Curso concluído', exact: true })).toBeDisabled();
  await page.getByRole('tab', { name: 'Concluídos' }).click();
  await expect(page.getByRole('heading', { name: 'Fundamentos de React', exact: true })).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(1);
});
